import React from "react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer>
			<div className="container py-6">
				<div className="flex flex-col items-end justify-between gap-8 md:flex-row">
					<div className="flex flex-col items-center md:items-start">
						Make Your Meme
						<p className="text-sm text-muted-foreground">
							Vibe coded by{" "}
							<Link
								target="_blank"
								href={"https://www.yogendrarana.com.np"}
								className="underline text-sm text-muted-foreground"
							>
								Yogendra Rana
							</Link>
						</p>
					</div>

					<div className="flex flex-col items-center md:items-start">
						Credits:{" "}
						<Link
							target="_blank"
							href="https://imgflip.com/memetemplates"
							className="underline text-sm text-muted-foreground"
						>
							Imgflip Meme Templates
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
