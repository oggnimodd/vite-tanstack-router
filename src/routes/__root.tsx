import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/components/not-found";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster />
			<div className="p-2 flex items-center justify-between">
				<div className="flex gap-2">
					<Link
						activeProps={{
							className: "text-blue-500",
						}}
						to="/"
						className="px-2"
					>
						Home
					</Link>
					<Link
						activeProps={{
							className: "text-blue-500",
						}}
						to="/about"
						className="px-2"
					>
						About
					</Link>
					<Link
						activeProps={{
							className: "text-blue-500",
						}}
						to="/user"
						className="px-2"
					>
						Users
					</Link>
				</div>
				{/* Mode toggle */}
				<ModeToggle />
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</ThemeProvider>
	),
	notFoundComponent: NotFound,
});
