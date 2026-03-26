const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// @route   GET api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } }
    });
    
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.user.id },
        include: { items: { include: { product: true } } }
      });
    }
    
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await prisma.cart.findUnique({ where: { userId: req.user.id } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: req.user.id } });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId
        }
      }
    });

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity || 1) }
      });
      return res.json(updatedItem);
    }

    // Create new item
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: quantity || 1
      }
    });

    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/cart/:itemId
// @desc    Update item quantity
// @access  Private
router.put('/:itemId', auth, async (req, res) => {
  const { quantity } = req.body;
  try {
    const item = await prisma.cartItem.update({
      where: { id: req.params.itemId },
      data: { quantity }
    });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/:itemId', auth, async (req, res) => {
  try {
    await prisma.cartItem.delete({
      where: { id: req.params.itemId }
    });
    res.json({ msg: 'Item removed from cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
