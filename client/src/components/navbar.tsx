import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <Briefcase className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-foreground">JobHub Portal</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
              data-testid="link-jobs"
            >
              Jobs
            </Link>
            <a 
              href="#companies" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-companies"
            >
              Companies
            </a>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-about"
            >
              About
            </a>
            <Button data-testid="button-post-job">
              Post a Job
            </Button>
          </nav>
          <Button variant="ghost" className="md:hidden" data-testid="button-mobile-menu">
            <Menu className="text-xl" />
          </Button>
        </div>
      </div>
    </header>
  );
}
