import { cn } from "@/lib/utils";
import { ArrowLeft, RotateCcw, Download } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { MemeTemplate } from "@/config/meme";

export default function EditorHeader({
	template,
	onResetText,
	onReplaceImage,
	onDownload,
	fileInputRef,
	onFileChange,
}: {
	template: MemeTemplate;
	onResetText: () => void;
	onReplaceImage: () => void;
	onDownload: () => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<header className="border-b border-border bg-card/50 backdrop-blur-xl">
			<div className="container mx-auto py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className={cn(
								buttonVariants({ variant: "outline", size: "sm" }),
								"rounded-full",
							)}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back
						</Link>
					</div>
					<div className="flex gap-2 items-center">
						<Button
							onClick={onResetText}
							variant="outline"
							size="sm"
							className="rounded-full px-4 py-2 text-sm font-semibold"
						>
							<RotateCcw className="w-4 h-4 mr-2" />
							Reset
						</Button>
						<Button
							onClick={onReplaceImage}
							size="sm"
							className="rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground shadow hover:shadow-lg"
						>
							Replace Image
						</Button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={onFileChange}
							className="hidden"
						/>
						<Button
							onClick={onDownload}
							size="sm"
							className="rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground shadow hover:shadow-lg"
						>
							<Download className="w-5 h-5 mr-2" />
							Download Your Meme
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
