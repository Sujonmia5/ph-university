/* eslint-disable prefer-const */
import { TCourseMarks } from './interface.enrolledCourse';

export const marksToGradeConverter = (courseMarks: TCourseMarks) => {
  let grade = {
    grade: 'NA',
    gradePoints: 0,
  };
  const totalNumber =
    courseMarks.classTest1 +
    courseMarks.midTerm +
    courseMarks.classTest2 +
    courseMarks.finalTerm;
  /*
   * F = 0-29
   * D = 30-49
   * C = 50-59
   * B = 60-69
   * A- = 70-79
   * A = 80-89
   * A+ = 90-100
   */
  if (totalNumber >= 0 && totalNumber <= 29) {
    grade.grade = 'F';
  } else if (totalNumber >= 30 && totalNumber <= 49) {
    grade.grade = 'D';
    grade.gradePoints = 1.0;
  } else if (totalNumber >= 50 && totalNumber <= 59) {
    grade.grade = 'C';
    grade.gradePoints = 2.0;
  } else if (totalNumber >= 60 && totalNumber <= 69) {
    grade.grade = 'B';
    grade.gradePoints = 2.5;
  } else if (totalNumber >= 70 && totalNumber <= 79) {
    grade.grade = 'A-';
    grade.gradePoints = 3.0;
  } else if (totalNumber >= 80 && totalNumber <= 89) {
    grade.grade = 'A';
    grade.gradePoints = 3.5;
  } else if (totalNumber >= 90 && totalNumber <= 100) {
    grade.grade = 'A+';
    grade.gradePoints = 4.0;
  } else {
    grade.grade = 'NA';
    grade.gradePoints = 0;
  }

  return grade;
};
