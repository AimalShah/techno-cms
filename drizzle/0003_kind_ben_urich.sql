CREATE TYPE "public"."attendance_status" AS ENUM('Present', 'Absent', 'Excused');--> statement-breakpoint
CREATE TABLE "announcements" (
	"announcement_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"posted_by_user_id" uuid NOT NULL,
	"posted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "announcements_announcement_id_unique" UNIQUE("announcement_id")
);
--> statement-breakpoint
CREATE TABLE "attendance" (
	"attendance_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enrollment_id" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"status" "attendance_status" NOT NULL,
	CONSTRAINT "attendance_attendance_id_unique" UNIQUE("attendance_id")
);
--> statement-breakpoint
CREATE TABLE "exam_results" (
	"exam_result_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"marks_obtained" real NOT NULL,
	CONSTRAINT "exam_results_exam_result_id_unique" UNIQUE("exam_result_id"),
	CONSTRAINT "unq_exam_result" UNIQUE("exam_id","student_id")
);
--> statement-breakpoint
CREATE TABLE "exams" (
	"exam_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"total_marks" real NOT NULL,
	CONSTRAINT "exams_exam_id_unique" UNIQUE("exam_id")
);
--> statement-breakpoint
CREATE TABLE "results" (
	"result_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enrollment_id" uuid NOT NULL,
	"marks_obtained" real NOT NULL,
	"total_marks" real NOT NULL,
	"grade" varchar(10) NOT NULL,
	CONSTRAINT "results_result_id_unique" UNIQUE("result_id")
);
--> statement-breakpoint
CREATE TABLE "tests" (
	"test_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"total_marks" real NOT NULL,
	CONSTRAINT "tests_test_id_unique" UNIQUE("test_id")
);
--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_posted_by_user_id_users_id_fk" FOREIGN KEY ("posted_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_enrollment_id_enrollments_enrollment_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("enrollment_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_exam_id_exams_exam_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("exam_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_enrollment_id_enrollments_enrollment_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("enrollment_id") ON DELETE cascade ON UPDATE restrict;