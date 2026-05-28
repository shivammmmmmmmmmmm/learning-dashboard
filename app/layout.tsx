import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dashboard – Shivam",
  description: "My learning dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0f] text-[#e2e4e9] antialiased">
        {children}
      </body>
    </html>
  )
}
