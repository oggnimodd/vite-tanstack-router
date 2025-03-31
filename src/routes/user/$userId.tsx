import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const Route = createFileRoute("/user/$userId")({
  component: RouteComponent,
  errorComponent: () => {
    return <p>Something went really wrong </p>;
  },
});

const fetchUser = async (userId: string): Promise<User> => {
  // Add return type
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  // *** Check if the response was successful ***
  if (!response.ok) {
    // Throw an error if status is not 2xx
    throw new Error(
      `Failed to fetch user: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  // *** Optional: Add a check for empty data if the API might return 200 with {} ***
  // Although for this API, a 404 is more likely for non-existent users.
  if (!data || Object.keys(data).length === 0) {
    throw new Error("User not found or invalid data received");
  }

  return data as User; // Type assertion after checks
};

function RouteComponent() {
  const { userId } = Route.useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser(userId)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setError("something went wrong"))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-muted-foreground">
            The requested user could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center mr-6 text-3xl font-bold mb-4 md:mb-0">
                {user.name.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground text-lg">
                  @{user.username}
                </p>
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                    {user.company.name}
                  </span>
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {user.address.city}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
            {/* Left Column - Personal Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-secondary/30 rounded-lg p-6 animate-fade-in-left">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Email
                    </h3>
                    <p className="mt-1">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Phone
                    </h3>
                    <p className="mt-1">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Website
                    </h3>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-primary hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6 animate-fade-in-left">
                <h2 className="text-xl font-semibold mb-4">Address</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Street
                    </h3>
                    <p className="mt-1">
                      {user.address.street}, {user.address.suite}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      City
                    </h3>
                    <p className="mt-1">{user.address.city}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Zipcode
                    </h3>
                    <p className="mt-1">{user.address.zipcode}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Coordinates
                    </h3>
                    <p className="mt-1">
                      {user.address.geo.lat}, {user.address.geo.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Company Info */}
            <div className="space-y-6">
              <div className="bg-secondary/30 rounded-lg p-6 animate-fade-in-right">
                <h2 className="text-xl font-semibold mb-4">Company</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Name
                    </h3>
                    <p className="mt-1 font-medium">{user.company.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Catchphrase
                    </h3>
                    <p className="mt-1 italic">"{user.company.catchPhrase}"</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Business
                    </h3>
                    <p className="mt-1">{user.company.bs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6 animate-fade-in-right">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-border rounded-md bg-background hover:bg-secondary transition-colors duration-200">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Email
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-border rounded-md bg-background hover:bg-secondary transition-colors duration-200">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call User
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-border rounded-md bg-background hover:bg-secondary transition-colors duration-200">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    View Security
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
