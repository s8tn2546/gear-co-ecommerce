const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  { name: 'Citizen Messenger Bag', price: 140.00, description: 'Our iconic seatbelt buckle messenger bag. Tough as nails. Guaranteed for Life.', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
  { name: 'Barrage Cargo Backpack', price: 160.00, description: '100% welded waterproof rolltop backpack with iconic cargo net.', imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800' },
  { name: 'Kadet Sling Bag', price: 95.00, description: 'Minimalist sling bag built to carry everyday essentials.', imageUrl: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=800' },
  { name: 'Urban Utility Jacket', price: 120.00, description: 'Weatherproof layer designed for the urban commute.', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
  { name: 'Mini Metro Messenger', price: 120.00, description: 'A smaller version of our iconic Citizen messenger bag.', imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800' },
  { name: 'Doubletrack Bar Bag', price: 65.00, description: 'Versatile handlebar bag that doubles as a sling.', imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800' },
  { name: 'Storm Cobra 3.0', price: 180.00, description: 'Fully waterproof, breathable urban cycling jacket.', imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=800' },
  { name: 'Banya Slides', price: 45.00, description: 'Tough, comfortable slides for post-ride recovery.', imageUrl: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=800' },
];

async function main() {
  await prisma.product.deleteMany({});
  for (const p of products) {
    await prisma.product.create({ data: { ...p, stock: 100 } });
  }
  console.log('Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
