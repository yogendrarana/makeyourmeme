"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github } from "lucide-react";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={cn(
				"w-full sticky p-4 top-4 z-50 rounded-lg border border-transparent",
				{
					"bg-background border border-border": isScrolled,
				},
			)}
		>
			<div className="flex items-center justify-between">
				{/* Logo */}
				<div className="mr-6 flex">
					<Link href="/" className="mr-8 flex items-center space-x-3 group">
						Make Your Meme
					</Link>
				</div>

				<div className="flex items-center gap-2">
					<a
						href="https://github.com/yogendrarana/makeyourmeme"
						target="_blank"
						rel="noopener noreferrer"
						title="View on GitHub"
						className="rounded-full p-2 hover:bg-accent transition-colors"
					>
						<Github className="w-5 h-5" aria-label="GitHub" />
					</a>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
