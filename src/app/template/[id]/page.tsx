import { notFound } from "next/navigation";
import Editor from "@/components/editor/editor";
import { memeTemplates } from "@/config/meme";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function TemplatePage({ params }: PageProps) {
	const { id } = await params;

	// Check if the template exists (for non-custom templates)
	if (id !== "custom") {
		const templateExists = memeTemplates.some((template) => template.id === id);
		if (!templateExists) {
			notFound();
		}
	}

	return <Editor templateId={id} />;
}
