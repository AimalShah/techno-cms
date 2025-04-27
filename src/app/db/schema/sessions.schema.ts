import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema";



export const sessions = pgTable("sessions", {
    sessionID: uuid("session_id").primaryKey().unique().defaultRandom(),
    userID: uuid("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
})
