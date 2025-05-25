import { eq } from 'drizzle-orm';
import { db } from '../..';
import { announcements } from '../../schema/announcements.schema';

export async function deleteAnnouncement(announcementId: string) {
  const deletedAnnouncement = await db.delete(announcements)
    .where(eq(announcements.announcementId, announcementId))
    .returning();
  return deletedAnnouncement[0];
}