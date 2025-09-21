import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CloudUpload, FileText, Trash2 } from "lucide-react";
import { useState } from "react";

interface ApplicationFormProps {
  jobId: string;
  onSuccess: () => void;
}

export default function ApplicationForm({ jobId, onSuccess }: ApplicationFormProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      jobId,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      portfolio: "",
      resumeUrl: "",
      experience: "",
      currentSalary: "",
      expectedSalary: "",
      coverLetter: "",
      startDate: "",
      workAuthorization: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertApplication & { resume: File }) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'resume' && value !== undefined) {
          formData.append(key, value as string);
        }
      });
      formData.append('resume', data.resume);
      
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit application');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your application has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs", jobId, "applications"] });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertApplication) => {
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate({ ...data, resume: resumeFile });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Apply for Position</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} data-testid="input-firstname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} data-testid="input-lastname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 123-4567" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://linkedin.com/in/johndoe" {...field} value={field.value || ""} data-testid="input-linkedin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Resume & Documents</h3>
            <div className="space-y-4">
              <div>
                <FormLabel>Resume/CV *</FormLabel>
                {!resumeFile ? (
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer mt-2"
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    data-testid="dropzone-resume"
                  >
                    <input 
                      type="file" 
                      id="resume-upload" 
                      accept=".pdf,.doc,.docx" 
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <CloudUpload className="w-8 h-8 text-muted-foreground mb-2 mx-auto" />
                    <p className="text-muted-foreground">Click to upload your resume</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                  </div>
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-md" data-testid="resume-preview">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm text-foreground">{resumeFile.name}</span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={removeFile}
                        data-testid="button-remove-resume"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio/Website</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://yourportfolio.com" {...field} value={field.value || ""} data-testid="input-portfolio" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Experience & Skills */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Experience & Skills</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-experience">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Salary (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="$70,000" {...field} value={field.value || ""} data-testid="input-current-salary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="$80,000" {...field} value={field.value || ""} data-testid="input-expected-salary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Cover Letter</h3>
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you interested in this position? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={6} 
                      placeholder="Tell us about your interest in this role, relevant experience, and what you can bring to our team..."
                      className="resize-none"
                      {...field}
                      data-testid="textarea-cover-letter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Questions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Additional Questions</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When can you start?</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} data-testid="input-start-date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workAuthorization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you authorized to work in this country?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex space-x-4"
                        data-testid="radio-work-auth"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="work-auth-yes" />
                          <label htmlFor="work-auth-yes" className="text-sm text-foreground">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="work-auth-no" />
                          <label htmlFor="work-auth-no" className="text-sm text-foreground">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={submitMutation.isPending}
              data-testid="button-submit-application"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
            <Button type="button" variant="outline" onClick={onSuccess} data-testid="button-cancel">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
