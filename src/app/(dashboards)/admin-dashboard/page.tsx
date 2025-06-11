import CardsSection from "@/components/cards-section";
import { Award, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AnnouncementDialog from "@/components/announcement-dialog";
import { getStudentsCount } from "@/db/queries/students/get";
import { getInstructorCount } from "@/db/queries/instructors/get";
import { getCourseCount } from "@/db/queries/courses/get";
import { getActiveEnrollments, getNewEnrollments } from "@/db/queries/enrollments/get";
import { getRecentAnnouncementWithPosterInfo } from "@/db/queries/announcements/get";

export default async function Page() {

  const [
    studentCount,
    instructorCount,
    totalCourses,
    activeEnrolls,
    recentAnnouncements,
    newEnrollments
  ] = await Promise.all([
    getStudentsCount(),
    getInstructorCount(),
    getCourseCount(),
    getActiveEnrollments(),
    getRecentAnnouncementWithPosterInfo(),
    getNewEnrollments()
  ]);

  const activeEnrollmentCount = activeEnrolls.length;
  const newEnrollmentCount = newEnrollments.length;

  return (
    <div className="space-y-6">

      <div className="px-6 py-2 space-y-2">
        <h1 className="text-4xl font-semibold">Welcome Back, Admin</h1>
        <div className="flex justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-500">Here's what's happening at your school today.</p>
          <AnnouncementDialog />
        </div>
      </div>

  
      <CardsSection
        students={studentCount}
        teachers={instructorCount}
        courses={totalCourses}
        enrollments={activeEnrollmentCount}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 px-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest student course enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newEnrollmentCount > 0 ? (
                <div className="space-y-3">
                  {newEnrollments.slice(0, 5).map((enrollment) => (
                    <div key={enrollment.enrollmentId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {enrollment.studentFirstName} {enrollment.studentLastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{enrollment.courseName}</p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <p>Starts: {new Date(enrollment.startDate).toLocaleDateString()}</p>
                        <p>Instructor: {enrollment.instructorFirstName} {enrollment.instructorLastName}</p>
                      </div>
                    </div>
                  ))}
                  {newEnrollmentCount > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{newEnrollmentCount - 5} more enrollments
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No new enrollments in the last 7 days</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 col-span-4">
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Active Enrollments</span>
                <span className="font-medium">{activeEnrollmentCount}</span>
              </div>
              <Progress value={Math.min((activeEnrollmentCount / 400) * 100, 100)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>New Enrollments (7 days)</span>
                <span className="font-medium">{newEnrollmentCount}</span>
              </div>
              <Progress value={Math.min((newEnrollmentCount / 20) * 100, 100)} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Pending Exams</span>
              </div>
              <Badge variant="outline">0</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm">New Announcements</span>
              </div>
              <Badge variant="outline">{recentAnnouncements.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 px-6 mb-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
            <CardDescription>Latest school announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((announcement) => (
                  <div key={announcement.announcementId} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{announcement.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>by {announcement.posterRole?.toUpperCase()}</span>
                        <span>•</span>
                        <span>{announcement.postedAt.toDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No recent announcements</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-muted-foreground">No upcoming exams</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}