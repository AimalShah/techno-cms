"use server";

import { db } from "@/db";
import { announcements } from "@/db/schema/announcements.schema";
import { getUser } from "@/lib/dal";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createAnnouncement(prevState: unknown, formData: FormData) {
    const user = await getUser();
    try {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        await db.insert(announcements).values({
            title,
            content,
            postedByUserId : user?.id as string,
        });

        revalidatePath("/admin-dashboard/announcements");
        return { error: false, message: "Announcement created successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to create announcement: ${error.message}` };
    }
}

export async function updateAnnouncement(prevState: unknown, formData: FormData) {
    try {
        const announcementId = formData.get("announcementId") as string;
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        await db.update(announcements).set({
            title,
            content,
        }).where(eq(announcements.announcementId, announcementId));

        revalidatePath("/admin-dashboard/announcements");
        return { error: false, message: "Announcement updated successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to update announcement: ${error.message}` };
    }
}

export async function deleteAnnouncement(prevState: unknown, formData: FormData) {
    try {
        const announcementId = formData.get("announcementId") as string;

        await db.delete(announcements).where(eq(announcements.announcementId, announcementId));

        revalidatePath("/admin-dashboard/announcements");
        return { error: false, message: "Announcement deleted successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to delete announcement: ${error.message}` };
    }
}
