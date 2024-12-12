/*
  Warnings:

  - Changed the type of `grade` on the `Grade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GradeEnum" AS ENUM ('EXCELLENT', 'GOOD', 'SATISFACTORY', 'UNSATISFACTORY', 'PASSED', 'NOT_PASSED');

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "grade",
ADD COLUMN     "grade" "GradeEnum" NOT NULL;
