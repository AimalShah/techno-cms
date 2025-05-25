import { pgTable, uuid,varchar,text,timestamp , foreignKey} from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const announcements = pgTable('announcements', {
  announcementId: uuid('announcement_id').primaryKey().unique().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  postedByUserId: uuid('posted_by_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'restrict' }),
  postedAt: timestamp('posted_at').defaultNow().notNull(),
});