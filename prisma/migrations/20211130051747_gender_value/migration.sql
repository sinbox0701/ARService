/*
  Warnings:

  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('M', 'W');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" "SEX" NOT NULL;
