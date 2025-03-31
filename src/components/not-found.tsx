import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react"; // <-- Import an icon (e.g., from lucide-react)

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Large prominent 404 */}
      <h1 className="mb-2 text-8xl font-extrabold tracking-tight text-primary sm:text-9xl">
        404
      </h1>

      {/* Secondary heading */}
      <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
        Page Not Found
      </h2>

      {/* Descriptive text */}
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Oops! It seems like the page you were looking for doesn't exist or has
        been moved.
      </p>

      {/* Back home button with icon */}
      <Button asChild>
        {/* Use default variant (usually solid) */}
        <Link to="/">
          <Home className="mr-2 h-4 w-4" /> {/* Icon */}
          Go Back Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
