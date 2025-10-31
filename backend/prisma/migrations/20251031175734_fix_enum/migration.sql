/*
  Warnings:

  - The `category` column on the `quests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "quests" DROP COLUMN "category",
ADD COLUMN     "category" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" VARCHAR(20),
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
