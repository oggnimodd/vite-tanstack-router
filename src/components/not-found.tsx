import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1
        className="text-6xl font-bold text-foreground mb-4"
        style={{ fontFamily: "sans-serif" }}
      >
        404 - Not Found
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        The page you are looking for does not exist.
      </p>
      <Button asChild variant="outline" className="shadow-md">
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
