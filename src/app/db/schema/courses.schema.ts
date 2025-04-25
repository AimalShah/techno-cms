import {pgTable , uuid , varchar , integer , real} from "drizzle-orm/pg-core";
import { createSelectSchema , createInsertSchema } from "drizzle-zod";
import * as zod from "zod";


export const courses = pgTable("courses" , {
    courseID : uuid("course_id").primaryKey().unique().defaultRandom(),
    courseName : varchar("course_name").notNull(),
    duration : integer("duration").notNull(),
});


export const SchemaCourse = createSelectSchema(courses);
export const SchemaCourseList = zod.array(SchemaCourse);
export const SchemaCourseEdit = createInsertSchema(courses , {
    courseID : (schema) => 
        schema.uuid().nonempty(),
    courseName : (schema) => 
        schema
        .min(1 , {message : "course name can not be empty"})
        .max(55 , {message : "course name should not exceed 55 characters"})
});
export const SchemaCourseNew = createInsertSchema(courses , {
    courseID : (schema) => 
        schema.uuid().nonempty(),
    courseName : (schema) => 
        schema
        .min(1 , {message : "course name can not be empty"})
        .max(55 , {message : "course name should not exceed 55 characters"})
});


export type Course = zod.infer<typeof SchemaCourse>;
export type CourseEdit = zod.infer<typeof SchemaCourseEdit>;
export type CourseNew = zod.infer<typeof SchemaCourseNew>;
export type CourseField = Pick<Course, "courseID" | "courseName">;

