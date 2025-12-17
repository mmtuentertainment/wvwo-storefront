import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * WVWO-styled Toaster component
 * Uses brand colors: sign-green for success, brand-brown for info, etc.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-brand-cream group-[.toaster]:text-brand-brown group-[.toaster]:border-brand-mud/20 group-[.toaster]:shadow-md group-[.toaster]:rounded-sm",
          description: "group-[.toast]:text-brand-mud",
          actionButton:
            "group-[.toast]:bg-sign-green group-[.toast]:text-white group-[.toast]:rounded-sm",
          cancelButton:
            "group-[.toast]:bg-brand-mud/10 group-[.toast]:text-brand-mud group-[.toast]:rounded-sm",
          success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-sign-green",
          error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-600",
          warning: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-brand-orange",
          info: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-brand-brown",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
