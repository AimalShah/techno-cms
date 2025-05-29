import CardsSection from "@/components/cards-section";
import { getCourseCount } from "../db/queries/courses/get";
import { getInstructorCount } from "../db/queries/instructors/get";
import { getStudentsCount } from "../db/queries/students/get";
import { getActiveEnrollments, getEnrollmentCount, getEnrollmentsWithDetails, getNewEnrollments } from "../db/queries/enrollments/get";
import DataTable from "@/components/data-table";
import { enrllmentColumns, Enrollments, userColumns, Users } from "@/components/column";
import { getAllUsers } from "../db/queries/users/get";
import { Button } from "@/components/ui/button";
import { Award, ChartArea, Clock, MessageCircle, MessageSquare, NotebookText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AnnouncementDialog from "@/components/announcement-dialog";
import { getRecentAnnouncementWithPosterInfo } from "../db/queries/announcements/get";




export default async function Page() {

  const studentCount = await getStudentsCount()
  const instructorCount = await getInstructorCount();
  const totalCourses = await getCourseCount();
  const activeEnrolls = await getActiveEnrollments();
  const recentAnnouncements = await getRecentAnnouncementWithPosterInfo();



  return (
    <div className="">
      <div className="px-6 py-2 space-y-2">
        <h1 className="text-4xl font-semibold">Welcome Back, Admin</h1>
        <div className="flex justify-between">
          <p className="text-lg text-gray-500 ">Here is what's happening at your scholl today.</p>
          <AnnouncementDialog/>
        </div>
      </div>

      <CardsSection
        students={studentCount}
        teachers={instructorCount}
        courses={totalCourses}
        enrollments={activeEnrolls.length}
      />

      {/* Main Section*/}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 px-6 mt-6 pb-5">

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest student course enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              No Recent Enrollments
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
                <span className="font-medium">{activeEnrolls.length}</span>
              </div>
              <Progress value={(activeEnrolls.length / 400) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Average Exam Score</span>
                <span className="font-medium">{"58.9"}%</span>
              </div>
              <Progress value={58.9} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Pending Exams</span>
              </div>
              <Badge variant="outline">{0}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm">New Announcements</span>
              </div>
              <Badge variant="outline">{0}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botton Section */}
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
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.announcementId} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{announcement.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>by {announcement.posterRole?.toUpperCase()}</span>
                      <span>•</span>
                      <span>{announcement.postedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              No Exams
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
