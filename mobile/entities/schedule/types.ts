import { Group } from '@/entities/group/@x';

export interface Schedule {
  id: number;
  subjectId: number;
  groupId: number;
  date: string;
  time: string;
  location: string;
  subject?: Subject;
  group?: Group;
  attendances?: Attendance[];
}
