import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"

import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost:3000"),
  title: {
    default: "Shadcn Form Builder",
    template: "%s - Shadcn Form Builder",
  },
  keywords: ["React", "Shadcn", "React hook form", "Zod"],
  authors: [
    {
      name: "Aman Reddy",
      url: "https://portfolio-aman-gamma.vercel.app/",
    },
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontMono.variable)}>
        <ThemeProvider enableSystem attribute="class">
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
