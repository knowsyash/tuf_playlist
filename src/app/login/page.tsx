"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        isRegister: !isLogin ? "true" : "false",
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-black/10 rounded-2xl shadow-xl shadow-black/5">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-xl font-black bg-black text-white mb-4 shadow-lg shadow-black/10">
            ⚡
          </div>
          <h1 className="text-2xl font-bold text-black mb-1">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-black/50">
            {isLogin ? "Login to sync your DSA progress" : "Sign up to track your DSA journey"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black/70 uppercase tracking-widest mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-black
                focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black/70 uppercase tracking-widest mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-black
                focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold text-sm rounded-xl px-4 py-3 
              hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-black/50">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-black font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>

      </div>
    </div>
  );
}
