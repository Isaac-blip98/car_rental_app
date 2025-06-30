import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
 const adminEmail = 'ndiranguelvis97@gmail.com';
  const adminPassword = 'elvis123';

async function main() {
  await prisma.user.deleteMany({ where: { email: adminEmail } });

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Super Admin',
      role: Role.ADMIN,
      verified: true,
      profileImage: 'https://i.pravatar.cc/150?img=1',
    },
  });

  console.log('✅ Admin user created.');
}
  // import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.vehicleCategory.createMany({
//     data: [
//       { name: 'SUV', description: 'Sport Utility Vehicle' },
//       { name: 'Sedan', description: 'Comfortable city car' },
//       { name: 'Truck', description: 'Heavy duty vehicle' },
//     ],
//      skipDuplicates: true,
//   });

//   console.log('✅ Seed complete');
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(() => prisma.$disconnect());
main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });