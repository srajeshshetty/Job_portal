import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface JobFiltersProps {
  filters: {
    search: string;
    location: string;
    jobType: string[];
    experienceLevel: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export default function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleLocationChange = (value: string) => {
    const location = value === "all" ? "" : value;
    onFiltersChange({ ...filters, location });
  };

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const newJobTypes = checked 
      ? [...filters.jobType, type]
      : filters.jobType.filter(t => t !== type);
    onFiltersChange({ ...filters, jobType: newJobTypes });
  };

  const handleExperienceChange = (level: string, checked: boolean) => {
    const newLevels = checked 
      ? [...filters.experienceLevel, level]
      : filters.experienceLevel.filter(l => l !== level);
    onFiltersChange({ ...filters, experienceLevel: newLevels });
  };

  return (
    <aside className="lg:w-80 shrink-0">
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Filter Jobs</h3>
          
          {/* Search Input */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-muted-foreground mb-2">
              Search
            </Label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Job title, keywords..." 
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-muted-foreground mb-2">
              Location
            </Label>
            <Select value={filters.location} onValueChange={handleLocationChange}>
              <SelectTrigger data-testid="select-location">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="New York, NY">New York, NY</SelectItem>
                <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                <SelectItem value="London, UK">London, UK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Type Filter */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-muted-foreground mb-2">
              Job Type
            </Label>
            <div className="space-y-2">
              {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`jobtype-${type}`}
                    checked={filters.jobType.includes(type)}
                    onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                    data-testid={`checkbox-jobtype-${type.toLowerCase()}`}
                  />
                  <Label htmlFor={`jobtype-${type}`} className="text-sm text-foreground">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-muted-foreground mb-2">
              Experience Level
            </Label>
            <div className="space-y-2">
              {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`experience-${level}`}
                    checked={filters.experienceLevel.includes(level)}
                    onCheckedChange={(checked) => handleExperienceChange(level, checked as boolean)}
                    data-testid={`checkbox-experience-${level.toLowerCase().replace(' ', '-')}`}
                  />
                  <Label htmlFor={`experience-${level}`} className="text-sm text-foreground">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
