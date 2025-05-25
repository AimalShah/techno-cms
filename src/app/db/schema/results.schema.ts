import { pgTable, uuid, varchar, real } from "drizzle-orm/pg-core";
import { enrollments } from "./enrollments.schema";




export const results = pgTable('results', {
  resultId: uuid('result_id').primaryKey().unique().defaultRandom(),
  enrollmentId: uuid('enrollment_id')
    .notNull()
    .references(() => enrollments.enrollmentID, { onDelete: 'cascade', onUpdate: 'restrict' }),
  marksObtained: real('marks_obtained').notNull(),
  totalMarks: real('total_marks').notNull(),
  grade: varchar('grade', { length: 10 }).notNull(),
});