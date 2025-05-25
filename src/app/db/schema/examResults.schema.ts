import { pgTable, uuid, real, unique } from "drizzle-orm/pg-core";
import { exams } from "./exams.schema";
import { students } from "./students.schema";

export const examResults = pgTable('exam_results', {
  examResultId: uuid('exam_result_id').primaryKey().unique().defaultRandom(),
  examId: uuid('exam_id')
    .notNull()
    .references(() => exams.examId, { onDelete: 'cascade', onUpdate: 'restrict' }),
  studentId: uuid('student_id')
    .notNull()
    .references(() => students.studentID, { onDelete: 'cascade', onUpdate: 'restrict' }),
  marksObtained: real('marks_obtained').notNull(),
}, (table) => {
  return {
    unqExamResult: unique('unq_exam_result').on(table.examId, table.studentId),
  };
});