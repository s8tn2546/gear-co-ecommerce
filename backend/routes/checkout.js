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
  const { shippingAddress, cartItems } = req.body;
  
  if (!shippingAddress) {
    return res.status(400).json({ msg: 'Shipping address is required' });
  }
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ msg: 'Cart is empty' });
  }

  try {
    let totalAmount = 0;
    const orderItemsData = [];
    
    for (const item of cartItems) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) continue;
      
      const itemTotal = item.quantity * product.price;
      totalAmount += itemTotal;
      
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    if (orderItemsData.length === 0) {
      return res.status(400).json({ msg: 'Invalid cart items' });
    }

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
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Try to clean up local DB cart if it actually existed
      try {
        const dbCart = await tx.cart.findUnique({ where: { userId: req.user.id } });
        if (dbCart) {
          await tx.cartItem.deleteMany({ where: { cartId: dbCart.id } });
        }
      } catch (e) {}

      return newOrder;
    });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
