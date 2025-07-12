import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "../styles/globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
	title: "Make Your Meme",
	description: "Create your own memes easily",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`w-full flex flex-col justify-center overflow-x-hidden scroll-smooth ${inter.className}`}
			>
				<Providers>{children}</Providers>
			</body>
			<Analytics />
		</html>
	);
}
