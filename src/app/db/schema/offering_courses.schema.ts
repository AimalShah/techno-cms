import {pgTable , uuid , real} from "drizzle-orm/pg-core";
import * as zod from "zod";
import { courses } from "./courses.schema";
import { instructors } from "./instructors.schema";


export const offeringCourses = pgTable("offering_courses" , {
    offeringID : uuid("offering_id").primaryKey().unique().defaultRandom(),
    courseID : uuid("course_id")
            .notNull()
            .references(() => courses.courseID, {
                onDelete : "cascade",
                onUpdate : "restrict",
            }),
    instructorID : uuid("instructor_id")
                .notNull()
                .references(() => instructors.instructorID, {
                    onDelete : "cascade",
                    onUpdate : "restrict"
                }),
    price : real("price").notNull()
});

