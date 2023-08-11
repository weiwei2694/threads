import "../globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "create your first thread",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-gradient-to-tr from-primary-500 to-indigo-500`}>
          <main className="min-h-screen grid place-items-center">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
