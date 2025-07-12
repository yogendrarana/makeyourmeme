"use client";

import React from "react";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function ImageUpload() {
	const router = useRouter();
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleCustomImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imageDataUrl = e.target?.result as string;
				// Store image data in localStorage (or global state)
				localStorage.setItem("customImage", imageDataUrl);
				localStorage.setItem("imageName", file.name);
				// Navigate to editor page with query param to indicate custom image
				router.push("/template/custom");
			};
			reader.readAsDataURL(file);
		}
	};

	const triggerFileUpload = () => {
		fileInputRef.current?.click();
	};

	return (
		<div>
			<Button
				variant={"outline"}
				onClick={triggerFileUpload}
				className="cursor-pointer rounded-md px-8 py-3 transition-all duration-300"
			>
				<UploadIcon className="w-5 h-5 mr-2" />
				Upload Custom Template
			</Button>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleCustomImageUpload}
				className="hidden"
			/>
		</div>
	);
}
