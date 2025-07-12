import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer>
			<div className="container py-6">
				<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
					<div className="flex flex-col items-center gap-4 md:items-start">
						Make Your Meme
					</div>
					<p className="text-sm text-muted-foreground">
						Vibe coded by{" "}
						<Link
							href={"https://www.yogendrarana.com.np"}
							className="underline text-sm text-muted-foreground"
						>
							Yogendra Rana
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
