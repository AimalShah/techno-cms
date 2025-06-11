import { db } from "../..";
import { announcements } from "../../schema/announcements.schema";


export async function createAnnouncement(announcementData: { title: string; content: string; postedByUserId: string }) {
  const newAnnouncement = await db.insert(announcements).values(announcementData).returning();
  return newAnnouncement[0];
}