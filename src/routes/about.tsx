import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

interface CardProps {
	title: string;
	description: string;
	image: string;
}

const Card = ({ title, description, image }: CardProps) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-4">
			<img src={image} alt={title} className="w-32 h-32 rounded-full" />
			<h2 className="text-2xl font-bold text-center">{title}</h2>
			<p className="dark:text-white/80 text-black/80 text-center">
				{description}
			</p>
		</div>
	);
};

const dummyData = [
	{
		title: "Card Title 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		image: "https://picsum.photos/id/1/200/300",
	},
	{
		title: "Card Title 2",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		image: "https://picsum.photos/id/10/200/300",
	},
	{
		title: "Card Title 3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		image: "https://picsum.photos/id/10/200/300",
	},
];

function About() {
	return (
		<div className="container mx-auto flex flex-col items-center justify-center gap-4 p-4">
			<h1 className="text-4xl font-bold">About</h1>
			<div className="grid grid-cols-3 gap-4">
				{dummyData.map((data) => (
					<Card
						key={data.title}
						title={data.title}
						description={data.description}
						image={data.image}
					/>
				))}
			</div>
		</div>
	);
}
