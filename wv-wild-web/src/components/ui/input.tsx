import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-sm border-2 border-brand-mud/30 bg-brand-cream px-4 py-3 text-base text-brand-brown ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-brand-brown placeholder:text-brand-mud/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sign-green focus-visible:border-sign-green disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
