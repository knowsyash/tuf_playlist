import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TrackerProvider } from "@/lib/tracker-context";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Striver A2Z DSA Sheet Tracker",
  description:
    "Track your progress through the complete Striver A2Z DSA Sheet — with direct links to LeetCode & GeeksforGeeks for every problem.",
  keywords: ["DSA", "LeetCode", "GeeksforGeeks", "Striver", "A2Z", "Data Structures", "Algorithms"],
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white antialiased`}>
        <Providers>
          <TrackerProvider>{children}</TrackerProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
