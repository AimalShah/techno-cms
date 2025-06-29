
import { getAnnouncementsWithPosterInfo } from "@/db/queries/announcements/get";

export default async function AnnouncementsPage() {
    const announcements = await getAnnouncementsWithPosterInfo();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Announcements</h1>
            <div className="space-y-4">
                {announcements.map((announcement) => (
                    <div key={announcement.announcementId} className="p-4 border rounded-lg">
                        <h2 className="font-bold text-lg">{announcement.title}</h2>
                        <p className="text-sm text-gray-500">Posted by: {announcement.posterUsername} ({announcement.posterRole})</p>
                        <p className="mt-2">{announcement.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(announcement.postedAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
