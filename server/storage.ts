import { type Job, type InsertJob, type Application, type InsertApplication } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Job methods
  getJobs(): Promise<Job[]>;
  getJobById(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  
  // Application methods
  getApplicationsByJobId(jobId: string): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
}

export class MemStorage implements IStorage {
  private jobs: Map<string, Job>;
  private applications: Map<string, Application>;

  constructor() {
    this.jobs = new Map();
    this.applications = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed with sample jobs
    const sampleJobs: InsertJob[] = [
      {
        title: "MERN Stack Developer",
        company: "TechCorp Solutions",
        location: "Remote",
        type: "Full-time",
        description: "Build scalable web applications using MongoDB, Express.js, React, and Node.js. Work with a dynamic team on cutting-edge projects.",
        requirements: [
          "3+ years of experience with React.js and modern JavaScript",
          "Strong proficiency in Node.js and Express.js",
          "Experience with MongoDB and database design",
          "Knowledge of RESTful APIs and GraphQL",
          "Familiarity with version control systems (Git)"
        ],
        deliverables: [
          "Build job portal with React and modern UI components",
          "Implement user authentication and authorization",
          "Develop resume upload and management functionality",
          "Create admin panel for job management",
          "Implement real-time notifications and messaging"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Express.js"],
        salaryMin: 70000,
        salaryMax: 90000,
        experienceLevel: "Mid Level",
        companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=center",
        interviewQuestions: [
          "How do you handle file uploads in React?",
          "What is Redux used for?",
          "How do you manage state using in React vs application?",
          "What is the difference between props and state in React?",
          "How would you optimize database queries for performance?",
          "How can you optimize the server and enhanced security?",
          "What is registration and why is it needed?",
          "How do you handle authentication in MERN applications?",
          "What's the difference between GET and POST in API testing?",
          "How do you build a clear and structured admin panel?"
        ],
        isActive: true
      },
      {
        title: "Frontend Developer",
        company: "Creative Agency Inc",
        location: "New York, NY",
        type: "Full-time",
        description: "Create stunning user interfaces and experiences. Work with modern frameworks and design systems to build responsive web applications.",
        requirements: [
          "2+ years of experience with JavaScript and modern frameworks",
          "Proficiency in Vue.js or React",
          "Strong CSS and HTML skills",
          "Experience with responsive design",
          "Knowledge of design systems and component libraries"
        ],
        deliverables: [
          "Develop responsive user interfaces",
          "Implement design system components",
          "Optimize for performance and accessibility",
          "Collaborate with design team",
          "Maintain code quality and documentation"
        ],
        technologies: ["JavaScript", "Vue.js", "CSS", "TypeScript"],
        salaryMin: 65000,
        salaryMax: 85000,
        experienceLevel: "Entry Level",
        companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=center",
        interviewQuestions: [
          "How do you ensure cross-browser compatibility?",
          "What is the difference between CSS Grid and Flexbox?",
          "How do you optimize website performance?",
          "What are semantic HTML elements?",
          "How do you handle responsive design?"
        ],
        isActive: true
      },
      {
        title: "Backend Developer",
        company: "DataFlow Systems",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Design and implement robust server-side applications. Work with databases, APIs, and cloud infrastructure.",
        requirements: [
          "4+ years of experience with Python/Django",
          "Strong database design skills",
          "Experience with PostgreSQL",
          "Knowledge of AWS cloud services",
          "API design and development experience"
        ],
        deliverables: [
          "Design and implement APIs",
          "Optimize database performance",
          "Deploy applications to cloud",
          "Implement security best practices",
          "Monitor and maintain systems"
        ],
        technologies: ["Python", "Django", "PostgreSQL", "AWS"],
        salaryMin: 80000,
        salaryMax: 100000,
        experienceLevel: "Senior Level",
        companyLogo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=center",
        interviewQuestions: [
          "How do you design scalable APIs?",
          "What is database indexing?",
          "How do you handle database migrations?",
          "What are microservices?",
          "How do you implement authentication?"
        ],
        isActive: true
      }
    ];

    sampleJobs.forEach(job => {
      const id = randomUUID();
      const fullJob: Job = {
        ...job,
        id,
        postedAt: new Date(),
        salaryMin: job.salaryMin ?? null,
        salaryMax: job.salaryMax ?? null,
        companyLogo: job.companyLogo ?? null,
        isActive: job.isActive ?? true,
      };
      this.jobs.set(id, fullJob);
    });
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.isActive);
  }

  async getJobById(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = {
      ...insertJob,
      id,
      postedAt: new Date(),
      salaryMin: insertJob.salaryMin ?? null,
      salaryMax: insertJob.salaryMax ?? null,
      companyLogo: insertJob.companyLogo ?? null,
      isActive: insertJob.isActive ?? true,
    };
    this.jobs.set(id, job);
    return job;
  }

  async getApplicationsByJobId(jobId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.jobId === jobId);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      ...insertApplication,
      id,
      appliedAt: new Date(),
      linkedin: insertApplication.linkedin ?? null,
      portfolio: insertApplication.portfolio ?? null,
      currentSalary: insertApplication.currentSalary ?? null,
      expectedSalary: insertApplication.expectedSalary ?? null,
      startDate: insertApplication.startDate ?? null,
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }
}

export const storage = new MemStorage();
