import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/user/")({
	component: RouteComponent,
});

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

const fetchUsers = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await response.json();
	return data;
};

function RouteComponent() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers()
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center mb-8 animate-fade-in-down">
				Users Directory
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{users.map((user) => (
					<div
						key={user.id}
						className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:-translate-y-1"
					>
						<div className="p-6">
							<div className="flex items-center mb-4">
								<div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold text-xl">
									{user.name.charAt(0)}
								</div>
								<div>
									<h2 className="text-xl font-semibold">{user.name}</h2>
									<p className="text-muted-foreground">@{user.username}</p>
								</div>
							</div>

							<div className="space-y-3 text-sm">
								<div className="flex items-center">
									<svg
										className="w-4 h-4 mr-2 text-muted-foreground"
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
									<span className="truncate">{user.email}</span>
								</div>
								<div className="flex items-center">
									<svg
										className="w-4 h-4 mr-2 text-muted-foreground"
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
									<span>{user.phone}</span>
								</div>
								<div className="flex items-center">
									<svg
										className="w-4 h-4 mr-2 text-muted-foreground"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<span className="truncate">
										{user.address.city}, {user.address.street}
									</span>
								</div>
								<div className="flex items-center">
									<svg
										className="w-4 h-4 mr-2 text-muted-foreground"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
										/>
									</svg>
									<span>{user.website}</span>
								</div>
							</div>

							<div className="mt-6 pt-4 border-t border-border">
								<h3 className="text-sm font-medium text-muted-foreground mb-2">
									Works at
								</h3>
								<p className="font-medium">{user.company.name}</p>
								<p className="text-sm text-muted-foreground italic">
									"{user.company.catchPhrase}"
								</p>
							</div>

							<Link
								to="/user/$userId"
								params={{ userId: String(user.id) }}
								className="mt-6 inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200"
							>
								View Profile
								<svg
									className="ml-2 -mr-1 w-4 h-4"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
