# Overview

This is a modern job portal application built with a full-stack TypeScript architecture. The application allows users to browse and filter job listings, view detailed job descriptions, and submit applications with resume uploads. It features a clean, responsive interface using modern UI components and provides a seamless experience for both job seekers and potential employers.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **UI Framework**: Tailwind CSS for styling with shadcn/ui component library providing pre-built, accessible components
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Component Structure**: Modular component architecture with reusable UI components in the `/components/ui` directory

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Data Storage**: In-memory storage with interface-based design allowing for easy database integration later
- **File Uploads**: Multer middleware for handling resume uploads with file type validation
- **Development**: Hot module replacement and development server integration with Vite

## Database Schema (Ready for Integration)
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Tables**: 
  - Jobs table with comprehensive job posting information including requirements, deliverables, and technologies
  - Applications table linking to jobs with applicant details and resume storage
- **Schema Validation**: Zod schemas for runtime type checking and API validation

## Build and Deployment
- **Development**: Concurrent client and server development with Vite HMR
- **Production Build**: Optimized client bundle with server-side Express application
- **TypeScript**: Strict type checking across the entire codebase with path mapping for clean imports

# External Dependencies

## UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for building the component library
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library providing consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

## Data Management
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for TypeScript-first data validation

## Database (Configured)
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database service (configured but not yet connected)
- **Drizzle Kit**: Database migration and introspection tools

## Development Tools
- **Vite**: Fast build tool with HMR and optimized bundling
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Plugins**: Development environment enhancements for debugging and monitoring

## File Upload and Storage
- **Multer**: Express middleware for handling multipart/form-data for file uploads
- **File Validation**: PDF, DOC, and DOCX resume upload support with size limitations

## Routing and Navigation
- **Wouter**: Lightweight client-side routing library
- **Express Router**: Server-side routing for API endpoints