// src/queries/users/create.ts
import {users} from "../../schema"
import { enumUserRole } from "../../schema/users.schema";
import { db } from "../..";


export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  role: typeof enumUserRole.enumValues[number];
}) {

  const newUser = await db.insert(users).values({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  }).returning();

  return newUser[0];
}
