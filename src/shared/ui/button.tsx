import * as React from "react";
import { cn } from "../../utils/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "default",
            size = "md",
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    // Variants
                    variant === "default" &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    variant === "outline" &&
                    "border border-border bg-transparent hover:bg-muted",
                    variant === "ghost" &&
                    "bg-transparent hover:bg-muted",
                    variant === "destructive" &&
                    "bg-red-600 text-white hover:bg-red-700",
                    // Sizes
                    size === "sm" && "h-8 px-3 text-sm",
                    size === "md" && "h-10 px-4 text-sm",
                    size === "lg" && "h-12 px-6 text-base",
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
