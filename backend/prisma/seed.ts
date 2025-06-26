import { PrismaClient, Role, FuelType, Transmission } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // === 0. Delete Old Admin ===
  const oldAdminEmail = 'admin@carrental.com';
  await prisma.user.deleteMany({ where: { email: oldAdminEmail } });
  console.log(`🗑️ Deleted old admin user (${oldAdminEmail}) if existed.`);

  // === 1. Delete all vehicle-related data (in correct order) ===
  await prisma.vehicleFeatureMapping.deleteMany();
  await prisma.vehicleImage.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleFeature.deleteMany();
  await prisma.vehicleCategory.deleteMany();

  console.log('🗑️ All vehicle-related data deleted.');

  // === 2. Delete and recreate Admin ===
  const adminEmail = 'ndiranguelvis97@gmail.com';
  const adminPassword = 'elvis123';

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
  // === 2. Overwrite Vehicle Categories ===
  await prisma.vehicleCategory.deleteMany();
  const categoryNames = [
    { name: 'SUV', description: 'Sport Utility Vehicles' },
    { name: 'Sedan', description: 'Standard passenger cars' },
    { name: 'Economy', description: 'Fuel-efficient and budget-friendly' },
    { name: 'Luxury', description: 'High-end luxury vehicles' },
  ];

  for (const category of categoryNames) {
    await prisma.vehicleCategory.create({ data: category });
  }
  console.log('✅ Vehicle categories overwritten.');

  // === 3. Overwrite Vehicle Features ===
  await prisma.vehicleFeature.deleteMany();
  const features = ['Air Conditioning', 'Bluetooth', 'Navigation System', 'Backup Camera'];

  for (const name of features) {
    await prisma.vehicleFeature.create({ data: { name } });
  }
  console.log('✅ Vehicle features overwritten.');

  // === 4. Overwrite Demo Vehicle ===
  await prisma.vehicleFeatureMapping.deleteMany();
  await prisma.vehicleImage.deleteMany();
  await prisma.vehicle.deleteMany();

  const sedanCategory = await prisma.vehicleCategory.findFirst({ where: { name: 'Sedan' } });

  if (sedanCategory) {
    const vehicle = await prisma.vehicle.create({
      data: {
        title: 'Toyota Corolla 2022',
        description: 'Reliable and fuel-efficient sedan.',
        location: 'Nairobi',
        dailyRate: 45.0,
        hourlyRate: 6.5,
        fuelType: FuelType.PETROL,
        transmission: Transmission.AUTOMATIC,
        ac: true,
        categoryId: sedanCategory.id,
        images: {
          create: [
            {
              url: 'https://source.unsplash.com/featured/?toyota',
              isPrimary: true,
            },
          ],
        },
      },
    });

    const allFeatures = await prisma.vehicleFeature.findMany();
    for (const feature of allFeatures) {
      await prisma.vehicleFeatureMapping.create({
        data: {
          vehicleId: vehicle.id,
          featureId: feature.id,
        },
      });
    }

    console.log('✅ Demo vehicle overwritten.');
  }

  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
