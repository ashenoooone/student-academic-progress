import { Student } from '@/entities/student/@x';

export interface Group {
  id: number;
  name: string;
  course: number;
  faculty: string;
  students?: Student[];
  subjects?: Subject[];
  schedules?: Schedule[];
}
