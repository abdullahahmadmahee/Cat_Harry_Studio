import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudioSpace | Creative Workspaces",
  description: "Peer-to-Peer Creative Workspace & Production Studio Sharing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}