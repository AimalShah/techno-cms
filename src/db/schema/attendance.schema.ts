import { pgTable, uuid, timestamp, pgEnum  } from "drizzle-orm/pg-core";
import { enrollments } from "./enrollments.schema";




export const attendanceStatusEnum = pgEnum('attendance_status', ['Present', 'Absent', 'Excused']);

export const attendance = pgTable('attendance', {
  attendanceId: uuid('attendance_id').primaryKey().unique().defaultRandom(),
  enrollmentId: uuid('enrollment_id')
    .notNull()
    .references(() => enrollments.enrollmentID, { onDelete: 'cascade', onUpdate: 'restrict' }),
  date: timestamp('date').notNull(),
  status: attendanceStatusEnum('status').notNull(),
});
