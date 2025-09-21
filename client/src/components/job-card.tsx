import { type Job } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [, setLocation] = useLocation();

  const formatSalary = (min?: number, max?: number) => {
    if (!min || !max) return "Salary not specified";
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const formatDate = (date: Date | string) => {
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1" 
          onClick={() => setLocation(`/jobs/${job.id}`)}
          data-testid={`card-job-${job.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src={job.companyLogo || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=center"} 
                alt={`${job.company} logo`} 
                className="w-12 h-12 rounded-lg object-cover"
                data-testid={`img-company-logo-${job.id}`}
              />
              <div>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    data-testid={`text-job-title-${job.id}`}>
                  {job.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-company-${job.id}`}>
                  {job.company}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`text-description-${job.id}`}>
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {job.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.technologies.length - 4} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {job.type}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {formatSalary(job.salaryMin || undefined, job.salaryMax || undefined)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2 ml-4">
            <span className="text-xs text-muted-foreground" data-testid={`text-posted-date-${job.id}`}>
              {formatDate(job.postedAt)}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle bookmark functionality
              }}
              data-testid={`button-bookmark-${job.id}`}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
