import { Group } from '@/entities/group/@x';
import { Schedule } from '@/entities/schedule/@x';
import { Student } from '@/entities/student/@x';

export enum ExamType {
  EXAM = 'EXAM',
  CREDIT = 'CREDIT',
}

export enum InterimStatusEnum {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export enum GradeEnum {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  SATISFACTORY = 'SATISFACTORY',
  UNSATISFACTORY = 'UNSATISFACTORY',
  PASSED = 'PASSED',
  NOT_PASSED = 'NOT_PASSED',
}

export interface Subject {
  id: number;
  name: string;
  semester: number;
  hours: number;
  groupId: number;
  group?: Group;
  schedules?: Schedule[];
  grades?: Grade[];
  interimStatuses?: InterimStatus[];
}

export interface Grade {
  id: number;
  studentId: number;
  subjectId: number;
  grade: GradeEnum;
  examType: ExamType;
  date: string;
  student?: Student;
  subject?: Subject;
}

export interface InterimStatus {
  id: number;
  studentId: number;
  subjectId: number;
  status: InterimStatusEnum;
  date: string;
  student?: Student;
  subject?: Subject;
}
