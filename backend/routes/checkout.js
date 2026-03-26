const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// @route   GET api/checkout/orders
// @desc    Get all orders for the logged-in user
// @access  Private
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/checkout
// @desc    Checkout cart and create an order
// @access  Private
router.post('/', auth, async (req, res) => {
  const { shippingAddress } = req.body;
  
  if (!shippingAddress) {
    return res.status(400).json({ msg: 'Shipping address is required' });
  }

  try {
    // 1. Get user cart
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    // 2. Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItemsData = cart.items.map(cartItem => {
      const itemTotal = cartItem.quantity * cartItem.product.price;
      totalAmount += itemTotal;
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.product.price
      };
    });

    // 3. Create order transactionally to ensure data integrity
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId: req.user.id,
          totalAmount,
          shippingAddress,
          items: {
            create: orderItemsData
          }
        },
        include: { items: true }
      });

      // Update product stock
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Clear the cart items
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
