"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "../ui/input";
import ImageUpload from "../image-upload";
import { memeTemplates } from "@/config/meme";

export default function Templates() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [page, setPage] = useState(1);
	const templatesPerPage = 8;

	const filteredTemplates = memeTemplates.filter((template) => {
		const matchesSearch = template.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "all" || template.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	// Pagination logic
	const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
	const paginatedTemplates = filteredTemplates.slice(
		(page - 1) * templatesPerPage,
		page * templatesPerPage,
	);

	// Reset to page 1 when search or filter changes
	React.useEffect(() => {
		setPage(1);
	}, [searchTerm, selectedCategory]);

	return (
		<div>
			{/* Search and Filters */}
			<section className="pb-8">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
					<div className="relative w-full lg:w-[320px] min-w-[220px]">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
						<Input
							placeholder="Search for the perfect meme template..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="h-12 rounded-md text-base border-2 border-border focus:border-primary/50 bg-card/50 backdrop-blur-sm w-full"
						/>
					</div>

					<ImageUpload />
				</div>
			</section>

			{/* Meme Templates Grid */}
			<section className="pb-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
					{paginatedTemplates.map((template) => (
						<Link
							key={template.id}
							href={`/template/${template.id}`}
							className="group cursor-pointer"
						>
							<div className="relative overflow-hidden rounded-md bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]">
								<div className="aspect-square overflow-hidden">
									<img
										src={template.image}
										alt={template.name}
										loading="lazy"
										decoding="async"
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
								</div>
								<div className="p-4">
									<div className="flex items-start justify-between mb-2">
										<h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
											{template.name}
										</h3>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* Pagination Controls */}
				{totalPages > 1 && (
					<div className="flex justify-center mt-8 gap-2">
						<button
							disabled={page === 1}
							onClick={() => setPage(page - 1)}
							className="px-3 py-1 rounded-md border border-border bg-card text-foreground disabled:opacity-50"
						>
							Prev
						</button>
						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i + 1}
								onClick={() => setPage(i + 1)}
								className={`px-3 py-1 rounded-md border border-border bg-card text-foreground ${page === i + 1 ? "bg-primary text-primary-foreground" : ""}`}
							>
								{i + 1}
							</button>
						))}
						<button
							disabled={page === totalPages}
							onClick={() => setPage(page + 1)}
							className="px-3 py-1 rounded-md border border-border bg-card text-foreground disabled:opacity-50"
						>
							Next
						</button>
					</div>
				)}

				{filteredTemplates.length === 0 && (
					<div className="text-center py-16">
						<div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center mx-auto mb-4">
							<Search className="w-12 h-12 text-muted-foreground" />
						</div>
						<h3 className="text-2xl font-display font-semibold text-foreground mb-2">
							No templates found
						</h3>
						<p className="text-muted-foreground">
							Try adjusting your search or category filter
						</p>
					</div>
				)}
			</section>
		</div>
	);
}
