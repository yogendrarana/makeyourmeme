import React from "react";
import { cn } from "@/lib/utils";

interface PropTypes {
	children: React.ReactNode;
	className?: string;
	as?: React.ElementType;
	/**
	 * Makes the container fluid (full width) when true
	 * @default false
	 */
	fluid?: boolean;
}

const Shell: React.FC<PropTypes> = ({
	children,
	as: Comp = "div",
	className = "",
	fluid = false,
}) => {
	const baseStyles = cn(
		"mx-auto w-full px-2 md:px-4",
		!fluid && "max-w-screen-xl",
		className,
	);

	return <Comp className={baseStyles}>{children}</Comp>;
};

export default Shell;
