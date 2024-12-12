import { addDays, eachDayOfInterval, isWeekend } from 'date-fns';
import { GradeEnum, Prisma, PrismaClient } from '@prisma/client';
import { AttendanceStatus, ExamType, InterimStatusEnum } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  await prisma.attendance.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.interimStatus.deleteMany();
  await prisma.student.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.group.deleteMany();
  console.log('DATABASE SUCCESSFULLY CLEARED');

  // Создание группы
  const group = await prisma.group.create({
    data: {
      name: 'бПИНЖ-41',
      course: 4,
      faculty: 'ПИНЖ',
    },
  });

  // Создание студентов
  const studentsData: Prisma.StudentCreateInput[] = [
    {
      firstName: 'Роман',
      lastName: 'Гонтарь',
      patronymic: 'Борисович',
      login: 'gontar_roman',
      enrollmentYear: 2024,
      passwordHash: bcrypt.hashSync('123', Number(process.env.SECRET)),
      group: {
        connect: { id: group.id },
      },
    },
    {
      firstName: 'Денис',
      lastName: 'Климов',
      patronymic: 'Максимович',
      login: 'klimov_denis',
      enrollmentYear: 2024,
      passwordHash: bcrypt.hashSync('123', Number(process.env.SECRET)),
      group: {
        connect: { id: group.id },
      },
    },
    {
      firstName: 'Антон',
      lastName: 'Асмолов',
      patronymic: 'Борисович',
      login: 'asmolov_anton',
      enrollmentYear: 2024,
      passwordHash: bcrypt.hashSync('123', Number(process.env.SECRET)),
      group: {
        connect: { id: group.id },
      },
    },
    {
      firstName: 'Ильдар',
      lastName: 'Рамазанов',
      patronymic: 'Рамисович',
      login: 'ramazanov_ildar',
      passwordHash: bcrypt.hashSync('123', Number(process.env.SECRET)),
      enrollmentYear: 2024,
      group: {
        connect: { id: group.id },
      },
    },
  ];

  const students = await Promise.all(
    studentsData.map((student) =>
      prisma.student.create({
        data: student,
      }),
    ),
  );

  // Создание предметов
  const subjectsData: Prisma.SubjectCreateArgs[] = [
    {
      data: {
        name: 'Разработка мобильных приложений',
        semester: 7,
        hours: 200,
        groupId: group.id,
      },
    },
    {
      data: {
        name: 'БЖД',
        semester: 7,
        hours: 200,
        groupId: group.id,
      },
    },
    {
      data: {
        name: 'Экономика',
        semester: 7,
        hours: 200,
        groupId: group.id,
      },
    },
  ];

  const subjects = await Promise.all(
    subjectsData.map((subject) =>
      prisma.subject.create({
        ...subject,
      }),
    ),
  );

  // Создание расписания
  const startDate = new Date('2024-09-01');
  const endDate = new Date('2024-12-20');

  const scheduleData: Prisma.ScheduleCreateInput[] = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })
    .filter((date) => !isWeekend(date))
    .map((date, index) => {
      const subject = subjects[index % subjects.length];
      return {
        date,
        time: new Date(date.setHours(9, 0, 0)),
        location: 'Аудитория 101',
        subject: { connect: { id: subject.id } },
        group: { connect: { id: group.id } },
      };
    });

  const schedules = await Promise.all(
    scheduleData.map((schedule) => prisma.schedule.create({ data: schedule })),
  );

  // Заполнение посещаемости
  for (const schedule of schedules) {
    for (const student of students) {
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          scheduleId: schedule.id,
          status:
            Math.random() > 0.1
              ? AttendanceStatus.PRESENT
              : AttendanceStatus.ABSENT, // 90% присутствовал
        },
      });
    }
  }

  // Заполнение оценок и межсессионных статусов
  for (const student of students) {
    for (const subject of subjects) {
      await prisma.grade.create({
        data: {
          studentId: student.id,
          subjectId: subject.id,
          grade: [
            GradeEnum.EXCELLENT,
            GradeEnum.GOOD,
            GradeEnum.NOT_PASSED,
            GradeEnum.PASSED,
            GradeEnum.PASSED,
            GradeEnum.SATISFACTORY,
            GradeEnum.UNSATISFACTORY,
          ][Math.floor(Math.random() * 7)],
          examType: ExamType.EXAM,
          date: addDays(endDate, Math.floor(Math.random() * 10)),
        },
      });

      await prisma.interimStatus.create({
        data: {
          studentId: student.id,
          subjectId: subject.id,
          status:
            Math.random() > 0.2
              ? InterimStatusEnum.PASSED
              : InterimStatusEnum.FAILED, // 80% сдал
          date: addDays(endDate, Math.floor(Math.random() * 10)),
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
