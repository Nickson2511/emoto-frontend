import * as React from "react";
import { cn } from "../../utils/utils";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, checked = false, onCheckedChange, ...props }, ref) => {
        return (
            <button
                ref={ref}
                role="switch"
                aria-checked={checked}
                onClick={() => onCheckedChange?.(!checked)}
                className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600",
                    className
                )}
                {...props}
            >
                <span
                    className={cn(
                        "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                        checked ? "translate-x-5" : "translate-x-1"
                    )}
                />
            </button>
        );
    }
);

Switch.displayName = "Switch";
