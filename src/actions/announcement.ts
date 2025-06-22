"use server";

import { db } from "@/db";
import { announcements } from "@/db/schema/announcements.schema";
import { getUser, verifySession } from "@/lib/dal";
import { AnnouncementFormSchema, AnnouncementFormState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";


export async function createAnnouncement(state : any, formData : FormData ){

    const sesssion = await verifySession();

    if(!sesssion) {
        return {
            error : true,
            message : "Can not create Announcement"
        }
    }



    const validateField = AnnouncementFormSchema.safeParse({
        title : formData.get("title"),
        content : formData.get("content")
    });

    if(!validateField.success){
        return {
            errors : validateField.error.flatten().fieldErrors
        }
    };

    const {title , content} = validateField.data;

   const res  =  await db.insert(announcements).values({
        title : title,
        content : content,
        postedByUserId : sesssion.userId as string,
    });

    if(!res) {
        return {
            error : true,
            message : "Error Occured Try Again"
        }
    }

    revalidatePath("/admin-dashboard/");
    return {
        error : false,
        success : true,
        message : "Announcement Create Successfully"
    }

}