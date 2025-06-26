import {pgTable, uuid, date} from "drizzle-orm/pg-core";
import { students } from "./students.schema";
import { offeringCourses } from "./offering_courses.schema";
import { check } from "drizzle-orm/gel-core";
import { sql } from "drizzle-orm";




export const enrollments = pgTable("enrollments" , {
    enrollmentID : uuid("enrollment_id").primaryKey().unique().defaultRandom(),
    studentID : uuid("student_id")
                .notNull()
                .references(() => students.studentID, {
                    onDelete : "cascade",
                    onUpdate : "restrict"
                }),
    offeringID : uuid("offering_id")
                .notNull()
                .references(() => offeringCourses.offeringID, {
                    onDelete : "cascade",
                    onUpdate : "restrict"
                }),
    startDate : date("start_date").notNull(),
    endDate : date("end_date").notNull(),
}, () => [
    check("valid_date_range", sql`start_date < end_date`)
]);

