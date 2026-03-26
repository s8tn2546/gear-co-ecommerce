const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', [auth, admin], async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: { name: req.body.name }
    });
    res.json(category);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
