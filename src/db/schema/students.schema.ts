import { varchar, uuid, date, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema,  createSelectSchema } from "drizzle-zod"; 
import * as zod from "zod";  

export const students = pgTable("students" , {
    studentID : uuid("student_id").primaryKey().unique().defaultRandom(),
    firstName : varchar("first_name").notNull(),
    lastName : varchar("last_name").notNull(),
    email : varchar("email").unique().notNull(),
    rollNumber : varchar("roll_number").notNull(),
    phone :  varchar("phone").notNull(),
    address : varchar("address").notNull(),
    dateOfBirth : date("data_of_birth").notNull()
})

export const SchemaStudent = createSelectSchema(students);
export const SchemaStudentList = zod.array(SchemaStudent);
export const SchemaStudentEdit = createInsertSchema(students, {
    studentID : zod.string().uuid(),
    firstName : (schema) => 
        schema
        .min(1 , {message : "First Name can not be empty"})
        .max(55 , {message : "First Name should not exceed 55 characters"}),
    lastName : (schema) => 
        schema
        .min(1 , {message : "Last Name can not be empty"})
        .max(55 , {message : "Last Name should not exceed 55 characters"}),
    email : (schema) => 
        schema
        .email({message : "Enter valid email"})
        .nonempty("Please enter your email"),
    phone : (schema) =>
        schema
        .min(13 , {message : "number is not valid"})
        .max(13 , {message : "number longer than 13 digit please correct it"}),
    address : (schema) => 
            schema
            .min(4 , "address can not be less than 4 characters"),
});
export const SchemaStudentNew = createInsertSchema(students, {
    studentID : zod.string().uuid(),
    firstName : (schema) => 
        schema
        .min(1 , {message : "First Name can not be empty"})
        .max(55 , {message : "First Name should not exceed 55 characters"}),
    lastName : (schema) => 
        schema
        .min(1 , {message : "Last Name can not be empty"})
        .max(55 , {message : "Last Name should not exceed 55 characters"}),
    email : (schema) => 
        schema
        .email({message : "Enter valid email"})
        .nonempty("Please enter your email"),
    phone : (schema) =>
        schema
        .min(13 , {message : "number is not valid"})
        .max(13 , {message : "number longer than 13 digit please correct it"}),
    address : (schema) => 
            schema
            .min(4 , "address can not be less than 4 characters"),
});


export type Student = zod.infer<typeof SchemaStudent>;
export type StudentEdit = zod.infer<typeof SchemaStudentEdit>;
export type NewStudent = zod.infer<typeof SchemaStudentNew>;
export type StudentField = Pick<Student, "studentID" | "firstName">;


