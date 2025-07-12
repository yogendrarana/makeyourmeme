import React from "react";
import Shell from "@/components/shell";
import Footer from "@/components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Shell className="min-h-screen flex flex-col">
			<main className="flex-1">{children}</main>
			<Footer />
		</Shell>
	);
}
