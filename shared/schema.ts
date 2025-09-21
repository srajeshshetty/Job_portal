import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // Full-time, Part-time, Contract, Internship
  description: text("description").notNull(),
  requirements: text("requirements").array().notNull(),
  deliverables: text("deliverables").array().notNull(),
  technologies: text("technologies").array().notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  experienceLevel: text("experience_level").notNull(),
  companyLogo: text("company_logo"),
  interviewQuestions: text("interview_questions").array().notNull(),
  postedAt: timestamp("posted_at").notNull().default(sql`now()`),
  isActive: boolean("is_active").notNull().default(true),
});

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  resumeUrl: text("resume_url").notNull(),
  experience: text("experience").notNull(),
  currentSalary: text("current_salary"),
  expectedSalary: text("expected_salary"),
  coverLetter: text("cover_letter").notNull(),
  startDate: text("start_date"),
  workAuthorization: text("work_authorization").notNull(),
  appliedAt: timestamp("applied_at").notNull().default(sql`now()`),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  postedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedAt: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
