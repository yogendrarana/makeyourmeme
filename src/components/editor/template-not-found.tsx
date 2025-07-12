import React from "react";
import { buttonVariants } from "../ui/button";
import { ArrowLeft, Type } from "lucide-react";
import Link from "next/link";

export default function TemplateNotFound() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
					<Type className="w-8 h-8 text-muted-foreground" />
				</div>
				<h2 className="text-2xl font-display font-semibold text-foreground mb-2">
					Template not found
				</h2>
				<p className="text-muted-foreground mb-4">
					The meme template you're looking for doesn't exist.
				</p>
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Gallery
				</Link>
			</div>
		</div>
	);
}
