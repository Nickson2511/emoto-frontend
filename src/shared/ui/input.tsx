import * as React from "react";
import { cn } from "../../utils/utils";

export type InputProps =
    React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "dark:bg-gray-900 dark:border-gray-700 dark:text-white",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
