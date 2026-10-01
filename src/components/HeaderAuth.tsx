"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-16 h-6 animate-pulse bg-black/5 rounded-md" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-black/60 hidden sm:block">
          {session.user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 text-xs font-medium text-black/60 hover:text-black transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-xs font-semibold bg-black text-white px-3 py-1.5 rounded-lg hover:bg-black/80 transition-colors"
    >
      Login to Sync
    </Link>
  );
}
