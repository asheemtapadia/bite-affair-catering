import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center max-w-md">

        <h1 className="mb-4 text-6xl font-bold">404</h1>

        <p className="mb-4 text-xl text-muted-foreground">
          Oops! Page not found
        </p>

        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>

          <Button variant="outline" asChild>
            <a
              href="https://wa.me/919211570030"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact on WhatsApp
            </a>
          </Button>

        </div>

      </div>
    </div>
  );
};

export default NotFound;
