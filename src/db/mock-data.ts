import { faker } from '@faker-js/faker';
import { db } from './index';
import * as schema from './schema';

export async function generateMockData() {
  // Generate Users
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['student', 'instructor', 'admin']),
    });
  }
  const createdUsers = await db.insert(schema.users).values(users).returning();

  // Generate Instructors
  const instructors = [];
  for (let i = 0; i < 20; i++) {
    instructors.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
    });
  }
  const createdInstructors = await db.insert(schema.instructors).values(instructors).returning();

  // Generate Courses
  const courses = [];
  for (let i = 0; i < 30; i++) {
    courses.push({
      courseName: faker.company.catchPhrase(),
      duration: faker.number.int({ min: 1, max: 12 }),
    });
  }
  const createdCourses = await db.insert(schema.courses).values(courses).returning();

  // Generate Offering Courses
  const offeringCourses = [];
  for (let i = 0; i < 50; i++) {
    offeringCourses.push({
      courseID: faker.helpers.arrayElement(createdCourses).courseID,
      instructorID: faker.helpers.arrayElement(createdInstructors).instructorID,
      price: faker.number.int({ min: 100, max: 1000 }),
    });
  }
  const createdOfferingCourses = await db.insert(schema.offeringCourses).values(offeringCourses).returning();

  // Generate Students
  const students = [];
  for (let i = 0; i < 100; i++) {
    students.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      rollNumber: faker.string.alphanumeric(10),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      dateOfBirth: faker.date.past({ years: 20, refDate: '2004-01-01' }).toISOString().split('T')[0],
    });
  }
  const createdStudents = await db.insert(schema.students).values(students).returning();

  // Generate Enrollments
  const enrollments = [];
  for (let i = 0; i < 150; i++) {
    const startDate = faker.date.past({ years: 1 });
    const endDate = faker.date.future({ years: 1, refDate: startDate });
    enrollments.push({
      studentID: faker.helpers.arrayElement(createdStudents).studentID,
      offeringID: faker.helpers.arrayElement(createdOfferingCourses).offeringID,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
  }
  const createdEnrollments = await db.insert(schema.enrollments).values(enrollments).returning();

  console.log('Mock data generated successfully!');
}
