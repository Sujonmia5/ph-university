import { TAcademicSemester } from '../academicSemester/interface.academicSemester';
import { MUser } from './model.user';

const findLastStudent = async (payload: string) => {
  // console.log(payload);
  const lastStudentId = await MUser.findOne(
    {
      role: 'student',
      id: { $regex: payload },
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudentId?.id ? lastStudentId.id : undefined;
};

export const generatedId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  // 2030 01 0001
  const lastStudentId = await findLastStudent(`${payload.year}${payload.code}`);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  if (
    lastStudentId &&
    lastStudentCode === payload.code &&
    lastStudentYear === payload.year
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

const findLastFaculty = async (role: string) => {
  const lastFaculty = await MUser.findOne({
    role,
  })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generatedFacultyId = async (role: string) => {
  // F- 0001
  const faculty = await findLastFaculty(role);
  let currentId = (0).toString();
  if (faculty) {
    currentId = faculty.substring(3);
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return incrementId;
};
