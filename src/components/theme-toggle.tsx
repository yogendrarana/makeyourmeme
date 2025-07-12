"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="outline" size="icon" className="rounded-full">
				<Sun className="h-[1.2rem] w-[1.2rem]" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	}

	const cycleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	const getIcon = () => {
		if (theme === "light") {
			return <Sun className="h-[1.2rem] w-[1.2rem]" />;
		} else {
			return <Moon className="h-[1.2rem] w-[1.2rem]" />;
		}
	};

	return (
		<Button
			variant="outline"
			size="icon"
			className="rounded-full cursor-pointer"
			onClick={cycleTheme}
			title={`Current theme: ${theme}. Click to cycle themes.`}
		>
			{getIcon()}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
