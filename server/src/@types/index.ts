import { Student } from '@prisma/client';

export interface RequestWithUser {
  user: Student;
}
