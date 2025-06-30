/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `category` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_categoryId_fkey";

-- Drop the old categoryId column
ALTER TABLE "Vehicle" DROP COLUMN "categoryId";

-- Step 1: Add new nullable 'category' column first
ALTER TABLE "Vehicle" ADD COLUMN "category" TEXT;

-- Step 2: Set default value for existing rows (choose an actual existing category from your seed)
UPDATE "Vehicle" SET "category" = 'Sedan' WHERE "category" IS NULL;

-- Step 3: Make 'category' NOT NULL
ALTER TABLE "Vehicle" ALTER COLUMN "category" SET NOT NULL;
