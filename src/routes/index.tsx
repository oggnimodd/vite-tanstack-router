import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<Button
				className="mt-4"
				onClick={() => {
					toast.error("Hello");
				}}
			>
				Hello
			</Button>
		</div>
	);
}
