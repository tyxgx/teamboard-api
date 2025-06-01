import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('test123', 10);

  await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'testuser@example.com',
      password,
      role: 'MEMBER',
    },
  });

  console.log('✅ Test user seeded');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());