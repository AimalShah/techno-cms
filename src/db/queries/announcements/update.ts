import { eq } from "drizzle-orm";
import { db } from "../..";
import { announcements } from "../../schema/announcements.schema";

export async function updateAnnouncement(announcementId: string, announcementData: { title?: string; content?: string }) {
  const updatedAnnouncement = await db.update(announcements)
    .set(announcementData)
    .where(eq(announcements.announcementId, announcementId))
    .returning();
  return updatedAnnouncement[0];
}