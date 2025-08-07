import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
  size?: "sm" | "md";
}

export const Button = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded px-4 py-1.5 text-sm font-medium transition",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
          "bg-red-600 text-white hover:bg-red-700": variant === "destructive",
          "text-xs px-3 py-1": size === "sm",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
