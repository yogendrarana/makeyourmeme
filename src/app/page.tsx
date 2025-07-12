import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Templates from "@/components/layout/templates";
import Footer from "@/components/layout/footer";
import Shell from "@/components/shell";

export default function Index() {
	return (
		<div className="flex min-h-screen w-full bg-muted/50">
			<Shell className="flex flex-col w-full gap-10">
				<Header />
				<Hero />
				<Templates />
				<Footer />
			</Shell>
		</div>
	);
}
