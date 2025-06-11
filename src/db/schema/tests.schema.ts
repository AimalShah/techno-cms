import { pgTable, uuid, varchar, timestamp,real  } from "drizzle-orm/pg-core";

export const tests = pgTable('tests', {
  testId: uuid('test_id').primaryKey().unique().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  totalMarks: real('total_marks').notNull(),
});