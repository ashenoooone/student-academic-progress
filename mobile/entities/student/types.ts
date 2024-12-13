import { Group } from '@/entities/group/@x';
import { Schedule } from '@/entities/schedule/@x';
import {
  Grade,
  InterimStatus,
} from '@/entities/subject/@x';

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  EXCUSED = 'EXCUSED',
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  enrollmentYear: number;
  groupId: number;
  group?: Group;
  attendances?: Attendance[];
  grades?: Grade[];
  interimStatuses?: InterimStatus[];
  login: string;
  passwordHash: string;
}

export interface Attendance {
  id: number;
  studentId: number;
  scheduleId: number;
  status: AttendanceStatus;
  student?: Student;
  schedule?: Schedule;
}
