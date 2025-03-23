import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster />
			<div className="p-2 flex gap-2">
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				{/* Mode toggle */}
				<ModeToggle />
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</ThemeProvider>
	),
});
