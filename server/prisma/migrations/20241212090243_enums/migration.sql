/*
  Warnings:

  - Changed the type of `status` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `examType` on the `Grade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `InterimStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('EXAM', 'CREDIT');

-- CreateEnum
CREATE TYPE "InterimStatusEnum" AS ENUM ('PASSED', 'FAILED');

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "status",
ADD COLUMN     "status" "AttendanceStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "examType",
ADD COLUMN     "examType" "ExamType" NOT NULL;

-- AlterTable
ALTER TABLE "InterimStatus" DROP COLUMN "status",
ADD COLUMN     "status" "InterimStatusEnum" NOT NULL;
