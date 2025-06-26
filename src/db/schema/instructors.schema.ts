import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
// import { createSelectSchema, createInsertSchema } from "drizzle-zod";
// import * as zod from "zod";


export const instructors = pgTable("instructors", {
    instructorID: uuid("instructor_id").primaryKey().unique().defaultRandom(),
    firstName: varchar("firstName").notNull(),
    lastName: varchar("last_name").notNull(),
    phone: varchar("phone").notNull(),
    email: varchar("email").unique().notNull(),
    address : varchar("address").notNull()
});


// export const SchemaInstructor = createSelectSchema(instructors);
// export const SchemaInstructorNew = createInsertSchema(instructors , {
//     instructorID : (schema) => 
//             schema.uuid().nonempty(),
//     firstName : (schema) => 
//         schema
//         .min(1 , {message : "First Name can not be empty"})
//         .max(55 , {message : "First Name should not exceed 55 characters"}),
//     lastName : (schema) => 
//         schema
//         .min(1 , {message : "Last Name can not be empty"})
//         .max(55 , {message : "Last Name should not exceed 55 characters"}),
//     email : (schema) => 
//         schema
//         .email({message : "Enter valid email"})
//         .nonempty("Please enter your email"),
// });
// export const SchemaInstructorEdit = createInsertSchema(instructors , {
//     instructorID : (schema) => 
//             schema.uuid().nonempty(),
//     firstName : (schema) => 
//         schema
//         .min(1 , {message : "First Name can not be empty"})
//         .max(55 , {message : "First Name should not exceed 55 characters"}),
//     lastName : (schema) => 
//         schema
//         .min(1 , {message : "Last Name can not be empty"})
//         .max(55 , {message : "Last Name should not exceed 55 characters"}),
//     email : (schema) => 
//         schema
//         .email({message : "Enter valid email"})
//         .nonempty("Please enter your email"),
// });
// export const SchemaInstructorList = zod.array(SchemaInstructor);


// export type Instructor = zod.infer<typeof SchemaInstructor>;
// export type InstructorEdit = zod.infer<typeof SchemaInstructorEdit>;
// export type NewInstructor = zod.infer<typeof SchemaInstructorNew>;
// export type InstructorField = Pick<Instructor, "instructorID" | "firstName">;




