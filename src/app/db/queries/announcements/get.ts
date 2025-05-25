import { eq } from 'drizzle-orm';
import { db } from '../..';
import { announcements } from '../../schema/announcements.schema';
import { users } from '../../schema';


export async function getAllAnnouncements() {
  return await db.select().from(announcements);
}

export async function getAnnouncementById(announcementId: string) {
  const result = await db.select().from(announcements).where(eq(announcements.announcementId, announcementId)).limit(1);
  return result[0];
}

export async function getAnnouncementsByPostedByUserId(postedByUserId: string) {
  return await db.select().from(announcements).where(eq(announcements.postedByUserId, postedByUserId));
}

export async function getAnnouncementsWithPosterInfo() {
  return await db.select({
    announcementId: announcements.announcementId,
    title: announcements.title,
    content: announcements.content,
    postedAt: announcements.postedAt,
    posterUsername: users.username,
    posterEmail: users.email,
  })
  .from(announcements)
  .innerJoin(users, eq(announcements.postedByUserId, users.id));
}