CREATE TYPE "public"."emunUserRole" AS ENUM('student', 'instructor', 'admin');--> statement-breakpoint
CREATE TABLE "courses" (
	"course_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_name" varchar NOT NULL,
	"duration" integer NOT NULL,
	CONSTRAINT "courses_course_id_unique" UNIQUE("course_id")
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"enrollment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"offering_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	CONSTRAINT "enrollments_enrollment_id_unique" UNIQUE("enrollment_id")
);
--> statement-breakpoint
CREATE TABLE "instructors" (
	"instructor_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"address" varchar NOT NULL,
	CONSTRAINT "instructors_instructor_id_unique" UNIQUE("instructor_id"),
	CONSTRAINT "instructors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "offering_courses" (
	"offering_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"instructor_id" uuid NOT NULL,
	"price" real NOT NULL,
	CONSTRAINT "offering_courses_offering_id_unique" UNIQUE("offering_id")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"student_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"roll_number" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"data_of_birth" date NOT NULL,
	CONSTRAINT "students_student_id_unique" UNIQUE("student_id"),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "emunUserRole" NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"last_login" date NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_offering_id_offering_courses_offering_id_fk" FOREIGN KEY ("offering_id") REFERENCES "public"."offering_courses"("offering_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "offering_courses" ADD CONSTRAINT "offering_courses_course_id_courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "offering_courses" ADD CONSTRAINT "offering_courses_instructor_id_instructors_instructor_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("instructor_id") ON DELETE cascade ON UPDATE restrict;