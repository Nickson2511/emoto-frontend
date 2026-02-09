import * as React from "react";
import { cn } from "../../utils/utils";

export const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export const CardHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("border-b px-6 py-4", className)}
        {...props}
    />
);

export const CardTitle = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
        className={cn("text-lg font-semibold", className)}
        {...props}
    />
);

export const CardContent = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("px-6 py-4", className)}
        {...props}
    />
);
