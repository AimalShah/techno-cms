"use server";

import { db } from "@/db";
import { users, SchemaNewUser, SchemaUserEdit } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { z } from "zod";
import bcrypt from "bcrypt";

// Create User
export async function createUser(formData: FormData) {
  const validatedFields = SchemaNewUser.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { username, email, password, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
      role,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "User with this email or username already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  revalidatePath("/admin-dashboard/users");
  return { message: "User created successfully." };
}

// Get Users
export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve users.",
    };
  }
}

// Get User by ID
export async function getUserById(id: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user[0];
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve user.",
    };
  }
}

// Update User
export async function updateUser(id: string, formData: FormData) {
  const validatedFields = SchemaUserEdit.safeParse({
    id,
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }

  const { username, email, password, role } = validatedFields.data;
  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    await db.update(users).set({
      username,
      email,
      password: hashedPassword,
      role,
    }).where(eq(users.id, id));
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "User with this email or username already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Update User.",
    };
  }

  revalidatePath("/admin-dashboard/users");
  return { message: "User updated successfully." };
}

// Delete User
export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete User.",
    };
  }

  revalidatePath("/admin-dashboard/users");
  return { message: "User deleted successfully." };
}
