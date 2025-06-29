import { boolean, pgTable, date, uuid, pgEnum, text } from "drizzle-orm/pg-core";


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

