import { boolean, pgTable, date, real, uuid, pgEnum, text } from "drizzle-orm/pg-core";
import * as zod from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const enumUserRole = pgEnum("emunUserRole", [
    "student",
    "instructor",
    "admin"
]);


//User Table
export const users = pgTable("users", {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    username: text("username").notNull().unique(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    role: enumUserRole("role").default("student"),
    createdAt: date("createdAt").defaultNow(),
    lastLogin: date("last_login").defaultNow(),
    isActive: boolean("isActive").default(true)
});


//Schemas
export const SchemaUser = createSelectSchema(users);
export const SchemaUserList  = zod.array(SchemaUser);
export const SchemaNewUser = createInsertSchema(users, {
    username: (schema) =>
        schema.min(4, { message: "The username must be at least 4 character long." }).max(25, { message: "username can not be longer than 25 characters" }),
    password: (schema) =>
        schema.min(8, { message: "The password must be at least 8 character long." }).max(20, { message: "password can not be longer 25 character" }),
    role: zod.enum(["student", "instructor", "admin"])
});
export const SchemaUserEdit = createInsertSchema(users, {
    id: (schema) => schema.uuid().nonempty(),
    username: (schema) =>
        schema.min(4, { message: "The username must be at least 4 character long." }).max(25, { message: "username can not be longer than 25 characters" }),
    password: (schema) =>
        schema.min(8, { message: "The password must be at least 8 character long." }).max(20, { message: "password can not be longer 25 character" }),
    role: zod.enum(["student", "instructor", "admin"])
});

export type User = zod.infer<typeof SchemaUser>
export type UserEdit = zod.infer<typeof SchemaUserEdit>
export type NewUser = zod.infer<typeof SchemaNewUser>
export type UserField = Pick<User, "id" | "username">;
