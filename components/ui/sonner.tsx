"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

/**
 * Toaster sonner tinté aux couleurs H&L (dark only).
 * Le site n'a qu'un seul thème — on fige le theme à "dark" pour
 * éviter d'embarquer next-themes inutilement.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#131313",
          "--normal-text": "#F8F6F0",
          "--normal-border": "rgba(201,168,76,0.3)",
          "--success-bg": "#131313",
          "--success-text": "#F8F6F0",
          "--success-border": "rgba(201,168,76,0.45)",
          "--error-bg": "#131313",
          "--error-text": "#F8F6F0",
          "--error-border": "rgba(220,70,70,0.5)",
          "--border-radius": "0.125rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
