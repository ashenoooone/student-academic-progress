/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_login_key" ON "Student"("login");
