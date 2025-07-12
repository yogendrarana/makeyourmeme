"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Download,
	Type,
	Palette,
	RotateCcw,
	Sparkles,
	Zap,
	Plus,
	Settings,
	Trash2,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { memeTemplates } from "@/config/meme";
import Shell from "../shell";
import Link from "next/link";
import { cn } from "@/lib/utils";
import EditorHeader from "./editor-header";
import TemplateNotFound from "./template-not-found";
import TextSettings, {
	TextElement as TextSettingsElement,
} from "./text-settings";

interface MemeTemplate {
	id: string;
	name: string;
	image: string;
	category: string;
}

interface TextElement {
	id: string;
	text: string;
	x: number; // Canvas pixels
	y: number; // Canvas pixels
	fontSize: number;
	color: string;
	fontWeight: string;
	fontFamily: string;
	textAlign: string;
	strokeWidth: number;
	strokeColor: string;
	isDragging?: boolean;
	dragOffset?: { x: number; y: number };
}

const textColors = [
	"#ffffff",
	"#000000",
	"#ff0000",
	"#00ff00",
	"#0000ff",
	"#ffff00",
	"#ff00ff",
	"#00ffff",
];

interface EditorProps {
	templateId: string;
}

export default function Editor({ templateId }: EditorProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const [template, setTemplate] = useState<MemeTemplate | null>(null);
	const [customImageData, setCustomImageData] = useState<string | null>(null);
	const [textElements, setTextElements] = useState<TextElement[]>([
		{
			id: "1",
			text: "Your Text Here",
			x: 400,
			y: 300,
			fontSize: 32,
			color: "#ffffff",
			fontWeight: "900",
			fontFamily: "Arial",
			textAlign: "center",
			strokeWidth: 2,
			strokeColor: "#000000",
		},
	]);
	const [selectedElementId, setSelectedElementId] = useState<string | null>(
		"1",
	);
	const [expandedSettings, setExpandedSettings] = useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
	const [dragState, setDragState] = useState<{
		isDragging: boolean;
		elementId: string | null;
		offset: { x: number; y: number };
	}>({ isDragging: false, elementId: null, offset: { x: 0, y: 0 } });
	// Add state for file input ref
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (templateId === "custom") {
			const customImage = localStorage.getItem("customImage");
			const imageName = localStorage.getItem("imageName");

			if (customImage) {
				setCustomImageData(customImage);
				setTemplate({
					id: "custom",
					name: imageName || "Custom Image",
					image: customImage,
					category: "custom",
				});
			}
		} else if (templateId && templateId !== "custom") {
			const foundTemplate = memeTemplates.find(
				(template) => template.id === templateId,
			);
			if (foundTemplate) {
				setTemplate(foundTemplate);
			}
		}
	}, [templateId]);

	useEffect(() => {
		// Ensure there's always at least one text element
		if (textElements.length === 0) {
			const newId = "1";
			console.log("Creating default text element with ID:", newId);
			setTextElements([
				{
					id: newId,
					text: "Your Text Here",
					x: 400,
					y: 300,
					fontSize: 32,
					color: "#ffffff",
					fontWeight: "900",
					fontFamily: "Arial",
					textAlign: "center",
					strokeWidth: 2,
					strokeColor: "#000000",
				},
			]);
			setSelectedElementId(newId);
		} else if (
			!selectedElementId ||
			!textElements.find((el) => el.id === selectedElementId)
		) {
			// If no text is selected, select the first one
			console.log("Selecting first text element:", textElements[0].id);
			setSelectedElementId(textElements[0].id);
		}
	}, [textElements.length, selectedElementId, textElements]);

	// Cleanup effect for component unmount
	useEffect(() => {
		return () => {
			// Clean up canvas context
			const canvas = canvasRef.current;
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (ctx) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				}
			}
			// Reset state
			setTemplate(null);
			setCustomImageData(null);
			setImageLoaded(false);
		};
	}, []);

	// Debounced canvas redraw to prevent excessive updates
	useEffect(() => {
		if (template && imageLoaded) {
			const timeoutId = setTimeout(() => {
				drawCanvas();
			}, 16); // ~60fps

			return () => clearTimeout(timeoutId);
		}
	}, [template, textElements, imageLoaded, canvasSize]);

	const drawCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas || !template) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Use requestAnimationFrame for better performance
		requestAnimationFrame(() => {
			const img = new Image();
			if (!customImageData) {
				img.crossOrigin = "anonymous";
			}
			img.onload = () => {
				// Set canvas size to match image
				canvas.width = img.width;
				canvas.height = img.height;
				setCanvasSize({ width: img.width, height: img.height });

				// Draw the meme template
				ctx.drawImage(img, 0, 0);

				// Draw text elements
				textElements.forEach((element) => {
					ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
					ctx.textAlign = element.textAlign as CanvasTextAlign;
					ctx.fillStyle = element.color;
					ctx.strokeStyle = element.strokeColor;
					ctx.lineWidth = element.strokeWidth;

					// Draw stroke first
					if (element.strokeWidth > 0) {
						ctx.strokeText(element.text, element.x, element.y);
					}
					// Then fill
					ctx.fillText(element.text, element.x, element.y);
				});
			};
			img.src = template.image;
		});
	};

	const addTextElement = () => {
		const newId = `text-${Date.now()}`;
		const newElement: TextElement = {
			id: newId,
			text: "New Text",
			x: canvasSize.width / 2,
			y: canvasSize.height / 2,
			fontSize: 32,
			color: "#ffffff",
			fontWeight: "900",
			fontFamily: "Arial",
			textAlign: "center",
			strokeWidth: 2,
			strokeColor: "#000000",
		};
		setTextElements((prev) => [...prev, newElement]);
		setSelectedElementId(newId);
	};

	const updateTextElement = (
		id: string,
		updates: Partial<Omit<TextElement, "id">>,
	) => {
		setTextElements((prev) =>
			prev.map((el) => (el.id === id ? { ...el, ...updates } : el)),
		);
	};

	// Center default text element when canvas size is set
	useEffect(() => {
		if (
			canvasSize.width > 0 &&
			canvasSize.height > 0 &&
			textElements.length === 1
		) {
			// If there's only one text element and it's at the default position, center it
			const defaultText = textElements[0];
			if (defaultText.x === 400 && defaultText.y === 300) {
				updateTextElement(defaultText.id, {
					x: canvasSize.width / 2,
					y: canvasSize.height / 2,
				});
			}
		}
	}, [canvasSize, textElements.length, updateTextElement]);

	const deleteTextElement = (id: string) => {
		setTextElements((prev) => {
			const updated = prev.filter((el) => el.id !== id);
			// If the deleted element was selected, select the first remaining
			if (selectedElementId === id) {
				setSelectedElementId(updated[0].id);
			}
			return updated;
		});
	};

	const getCanvasCoordinates = (clientX: number, clientY: number) => {
		const canvas = canvasRef.current;
		if (!canvas) return { x: 0, y: 0 };

		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		return {
			x: (clientX - rect.left) * scaleX,
			y: (clientY - rect.top) * scaleY,
		};
	};

	const handleCanvasMouseDown = (e: React.MouseEvent) => {
		const coords = getCanvasCoordinates(e.clientX, e.clientY);

		// Find which text element was clicked (if any)
		const clickedElement = textElements.find((element) => {
			const canvas = canvasRef.current;
			if (!canvas) return false;

			const ctx = canvas.getContext("2d");
			if (!ctx) return false;

			ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
			const metrics = ctx.measureText(element.text);
			const textWidth = metrics.width;
			const textHeight = element.fontSize;

			return (
				coords.x >= element.x - textWidth / 2 &&
				coords.x <= element.x + textWidth / 2 &&
				coords.y >= element.y - textHeight &&
				coords.y <= element.y
			);
		});

		if (clickedElement) {
			setDragState({
				isDragging: true,
				elementId: clickedElement.id,
				offset: {
					x: coords.x - clickedElement.x,
					y: coords.y - clickedElement.y,
				},
			});
			setSelectedElementId(clickedElement.id);
		}
	};

	const handleCanvasMouseMove = (e: React.MouseEvent) => {
		if (!dragState.isDragging || !dragState.elementId) return;

		const coords = getCanvasCoordinates(e.clientX, e.clientY);
		updateTextElement(dragState.elementId, {
			x: coords.x - dragState.offset.x,
			y: coords.y - dragState.offset.y,
		});
	};

	const handleCanvasMouseUp = () => {
		setDragState({
			isDragging: false,
			elementId: null,
			offset: { x: 0, y: 0 },
		});
	};

	const downloadMeme = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const link = document.createElement("a");
		const filename =
			templateId === "custom"
				? `custom-meme-${Date.now()}.png`
				: `${template?.name || "meme"}.png`;
		link.download = filename;
		link.href = canvas.toDataURL();
		link.click();
	};

	const resetText = () => {
		const newId = `${Date.now()}`;
		setTextElements([
			{
				id: newId,
				text: "Your Text Here",
				x: canvasSize.width > 0 ? canvasSize.width / 2 : 400,
				y: canvasSize.height > 0 ? canvasSize.height / 2 : 300,
				fontSize: 32,
				color: "#ffffff",
				fontWeight: "900",
				fontFamily: "Arial",
				textAlign: "center",
				strokeWidth: 2,
				strokeColor: "#000000",
			},
		]);
		setSelectedElementId(newId);
		setExpandedSettings(null);
	};

	// Handler to trigger file input
	const triggerReplaceImage = () => {
		fileInputRef.current?.click();
	};

	// Handler for replacing image
	const handleReplaceImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imageDataUrl = e.target?.result as string;
				// Store image data and name in localStorage for consistency
				localStorage.setItem("customImage", imageDataUrl);
				localStorage.setItem("imageName", file.name);
				setCustomImageData(imageDataUrl);
				setTemplate({
					id: "custom",
					name: file.name,
					image: imageDataUrl,
					category: "custom",
				});
				router.push("/template/custom");
			};
			reader.readAsDataURL(file);
		}
	};

	if (!template) {
		return <TemplateNotFound />;
	}

	return (
		<Shell>
			{/* Header */}
			<EditorHeader
				template={template}
				onResetText={resetText}
				onReplaceImage={triggerReplaceImage}
				onDownload={downloadMeme}
				fileInputRef={fileInputRef}
				onFileChange={handleReplaceImage}
			/>

			<div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Canvas */}
				<div className="lg:col-span-2">
					<div className="p-2 bg-card rounded-md border border-border">
						<div
							ref={canvasContainerRef}
							className="relative inline-block cursor-crosshair"
						>
							<canvas
								ref={canvasRef}
								className="max-w-full h-auto rounded-md shadow-lg"
								onMouseDown={handleCanvasMouseDown}
								onMouseMove={handleCanvasMouseMove}
								onMouseUp={handleCanvasMouseUp}
								onMouseLeave={handleCanvasMouseUp}
							/>

							{/* Hidden image for loading */}
							<img
								src={template.image}
								alt={template.name}
								className="hidden"
								crossOrigin={customImageData ? undefined : "anonymous"}
								onLoad={() => setImageLoaded(true)}
							/>
						</div>
					</div>
				</div>

				{/* text settings */}
				<TextSettings
					textElements={textElements as TextSettingsElement[]}
					selectedElementId={selectedElementId}
					onSelect={setSelectedElementId}
					onAdd={addTextElement}
					onDelete={deleteTextElement}
					onUpdate={updateTextElement}
				/>
			</div>
		</Shell>
	);
}
