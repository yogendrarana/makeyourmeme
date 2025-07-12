import React from "react";
import { Palette, Plus, Settings2, Trash2, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const FONT_OPTIONS = [
	"Arial",
	"Impact",
	"Comic Sans MS",
	"Times New Roman",
	"Courier New",
	"Georgia",
	"Verdana",
	"Tahoma",
];

export interface TextElement {
	id: string;
	text: string;
	fontSize: number;
	color: string;
	fontWeight: string;
	fontFamily: string;
	textAlign: string;
	strokeWidth: number;
	strokeColor: string;
}

interface TextSettingsProps {
	textElements: TextElement[];
	selectedElementId: string | null;
	onSelect: (id: string) => void;
	onAdd: () => void;
	onDelete: (id: string) => void;
	onUpdate: (id: string, updates: Partial<TextElement>) => void;
}

export default function TextSettings({
	textElements,
	selectedElementId,
	onSelect,
	onAdd,
	onDelete,
	onUpdate,
}: TextSettingsProps) {
	const selectedText = textElements.find((el) => el.id === selectedElementId);

	return (
		<div className="space-y-4">
			{/* Text Elements List */}
			<Card className="border border-border shadow-none rounded-md bg-card/70 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="flex justify-between items-center gap-2">
						<div className="flex items-center gap-2">Text Elements</div>

						<Button
							onClick={onAdd}
							variant="outline"
							className="rounded-full cursor-pointer flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Add Text
						</Button>
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-2">
						{textElements.map((textEl, index) => (
							<div key={textEl.id} className="flex items-center gap-1">
								<Badge
									variant={
										selectedElementId === textEl.id ? "default" : "secondary"
									}
									className={`cursor-pointer transition-all ${
										selectedElementId === textEl.id
											? "bg-primary text-primary-foreground"
											: "hover:bg-muted"
									}`}
									onClick={() => onSelect(textEl.id)}
								>
									Text {index + 1}
								</Badge>
								<Button
									variant="ghost"
									size="sm"
									className="w-6 h-6 p-0 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50 disabled:cursor-not-allowed"
									onClick={() => onDelete(textEl.id)}
									disabled={textElements.length === 1}
								>
									<Trash2 className="w-3 h-3" />
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{selectedText && (
				<Card className="border border-border shadow-none rounded-md bg-card/70 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Settings2 className="w-5 h-5 text-primary" />
							Text Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Text Input */}
						<div className="space-y-2">
							<Label className="text-sm font-medium text-foreground">
								Text Content
							</Label>
							<Input
								value={selectedText.text}
								onChange={(e) =>
									onUpdate(selectedText.id, { text: e.target.value })
								}
								className="bg-background/80 border-border focus:border-primary focus:ring-primary/20"
								placeholder="Enter your text..."
							/>
						</div>

						<Separator />

						{/* Font Family */}
						<div className="space-y-2">
							<Label className="text-sm font-medium text-foreground">
								Font Style
							</Label>
							<Select
								value={selectedText.fontFamily}
								onValueChange={(value) =>
									onUpdate(selectedText.id, { fontFamily: value })
								}
							>
								<SelectTrigger className="w-full bg-background/80 border-border">
									<SelectValue />
								</SelectTrigger>
								<SelectContent className="w-full">
									{FONT_OPTIONS.map((font) => (
										<SelectItem key={font} value={font}>
											{font}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<Separator />

						{/* Font Size */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Label className="text-sm font-medium text-foreground">
									Font Size
								</Label>
								<Badge
									variant="secondary"
									className="bg-accent text-accent-foreground"
								>
									{selectedText.fontSize}px
								</Badge>
							</div>
							<Slider
								value={[selectedText.fontSize]}
								onValueChange={([v]) =>
									onUpdate(selectedText.id, { fontSize: v })
								}
								min={12}
								max={72}
								step={1}
								className="w-full"
							/>
						</div>

						{/* Outline Width */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Label className="text-sm font-medium text-foreground">
									Outline Width
								</Label>
								<Badge
									variant="secondary"
									className="bg-accent text-accent-foreground"
								>
									{selectedText.strokeWidth}px
								</Badge>
							</div>
							<Slider
								value={[selectedText.strokeWidth]}
								onValueChange={([v]) =>
									onUpdate(selectedText.id, { strokeWidth: v })
								}
								min={0}
								max={8}
								step={1}
								className="w-full"
							/>
						</div>

						<Separator />

						{/* Colors */}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-foreground flex items-center gap-1">
									<Palette className="w-3 h-3" />
									Text Color
								</Label>
								<div className="flex gap-2">
									<input
										type="color"
										value={selectedText.color}
										onChange={(e) =>
											onUpdate(selectedText.id, { color: e.target.value })
										}
										className="w-10 h-10 border border-border cursor-pointer"
									/>
									<Input
										value={selectedText.color}
										onChange={(e) =>
											onUpdate(selectedText.id, { color: e.target.value })
										}
										className="flex-1 bg-background/80 text-xs font-mono"
										placeholder="#ffffff"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-foreground">
									Outline Color
								</Label>
								<div className="flex gap-2">
									<input
										type="color"
										value={selectedText.strokeColor}
										onChange={(e) =>
											onUpdate(selectedText.id, { strokeColor: e.target.value })
										}
										className="w-10 h-10 border border-border cursor-pointer"
									/>
									<Input
										value={selectedText.strokeColor}
										onChange={(e) =>
											onUpdate(selectedText.id, { strokeColor: e.target.value })
										}
										className="flex-1 bg-background/80 text-xs font-mono"
										placeholder="#000000"
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
