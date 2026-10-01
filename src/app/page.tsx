import { BackgroundBeams } from "@/components/ui/aceternity";
import { DSATracker } from "@/components/DSATracker";
import { HeaderAuth } from "@/components/HeaderAuth";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Header */}
      <header className="relative z-10 border-b border-black/[0.06] backdrop-blur-md bg-white/50 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 select-none bg-black text-white"
            >
              ⚡
            </div>
            <div>
              <h1 className="font-bold text-sm text-black leading-none">Striver A2Z DSA</h1>
              <p className="text-[10px] text-black/50 mt-0.5 leading-none">Sheet Tracker</p>
            </div>
          </div>

          {/* Platform icons in header */}
          <div className="flex items-center gap-3">
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-black/60 hover:text-[#FFA116] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/leetcode.svg"
                alt="LeetCode"
                className="w-4 h-4"
              />
              <span className="hidden sm:block font-medium">LeetCode</span>
            </a>
            <div className="w-px h-4 bg-black/10" />
            <a
              href="https://geeksforgeeks.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-black/60 hover:text-[#2ea44f] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                alt="GeeksforGeeks"
                className="w-4 h-4"
              />
              <span className="hidden sm:block font-medium">GFG</span>
            </a>
            <div className="w-px h-4 bg-black/10" />
            <a
              href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/60 hover:text-black transition-colors hidden sm:block"
            >
              Striver Sheet ↗
            </a>
            <div className="w-px h-4 bg-black/10 mx-1" />
            <HeaderAuth />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/10 rounded-full px-4 py-1.5 text-xs text-black/60 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Progress saved in your browser
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-black">
          Master DSA systematically
        </h2>
        <p className="text-black/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Track every problem from the{" "}
          <a
            href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black/80 underline underline-offset-2 transition-colors"
          >
            Striver A2Z Sheet
          </a>{" "}
          — 17 steps, 450+ problems, with direct links to{" "}
          <span className="text-black font-medium">LeetCode</span> &{" "}
          <span className="text-black font-medium">GeeksforGeeks</span>.
        </p>
      </section>

      {/* Tracker Content */}
      <main className="relative z-10">
        <DSATracker />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-black/[0.08] mt-8 py-6 text-center text-xs text-black/40">
        Built for competitive programmers &nbsp;·&nbsp;
        <a
          href="https://takeuforward.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/60 hover:text-black transition-colors"
        >
          takeuforward.org
        </a>
      </footer>
    </div>
  );
}
