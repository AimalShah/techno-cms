import { z } from "zod";

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be atleast 2 characters long." })
        .trim(),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: 'Contain at least on letter' })
        .regex(/[0-9]/, { message: 'Contain at least in number' })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Contain at least one special character."
        })
        .trim(),
    role : z.enum(["admin","student","instructor"] , {message : "Invalide Role"}),
});

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(1 , "Password Should not be empty")
})

export const AnnouncementFormSchema = z.object({
    title : z.string().min(1, "Title Should not be empty"),
    content : z.string().min(1, "Message Should not be empty")
});

export type FormState =
    | {
        errors?: {
            name?: string[],
            email?: string[],
            password?: string[]
        }
        message?: string
    }
    | undefined;

export type LoginFormState =
    | {
        errors?: {
            email?: string[]
        }
        message?: string
    }
    | undefined;

export type AnnouncementFormState = 
    | {
        errors? : {
            title? : string[],
            content : string[],
        }
        message?: string
    }
    |undefined;