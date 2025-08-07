import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        "border rounded px-3 py-2 text-sm w-full outline-none focus:ring focus:ring-blue-200",
        className
      )}
      {...props}
    />
  );
};
