import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-background">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
				<p className="mb-6 text-muted-foreground">
					Sorry, the page you are looking for does not exist.
				</p>
				<Link
					href="/"
					className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
