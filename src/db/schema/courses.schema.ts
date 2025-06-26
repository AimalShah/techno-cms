import {pgTable , uuid , varchar , integer } from "drizzle-orm/pg-core";



export const courses = pgTable("courses" , {
    courseID : uuid("course_id").primaryKey().unique().defaultRandom(),
    courseName : varchar("course_name").notNull(),
    duration : integer("duration").notNull(),
});

