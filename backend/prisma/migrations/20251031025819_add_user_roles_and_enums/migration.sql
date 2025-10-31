/*
  Warnings:

  - Changed the type of `role` on the `family_members` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Parent', 'Child');

-- CreateEnum
CREATE TYPE "FamilyRole" AS ENUM ('Parent', 'Child');

-- DropForeignKey
ALTER TABLE "public"."quests" DROP CONSTRAINT "quests_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."rewards" DROP CONSTRAINT "rewards_created_by_fkey";

-- AlterTable
ALTER TABLE "family_members" DROP COLUMN "role",
ADD COLUMN     "role" "FamilyRole" NOT NULL;

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Parent',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_key" ON "user_roles"("user_id");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quests" ADD CONSTRAINT "quests_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
