"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid credentials. Please verify your email and password.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during login.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-surface-admin flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg p-8 sm:p-10 shadow-ambient border border-admin-border">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-secondary/40 mb-3">
            <Image
              src="/assets/branding/logo.jpeg"
              alt="The Luxe Touch Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-serif text-2xl text-primary font-normal">The Luxe Touch</span>
          <span className="text-[10px] text-secondary uppercase tracking-[0.25em] font-semibold mt-1">
            Atelier Management Portal
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@theluxetouch.com"
                className="w-full pl-10 pr-4 py-2.5 rounded bg-surface-admin/50 border border-admin-border text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/80 font-semibold mb-1.5">
              Secret Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded bg-surface-admin/50 border border-admin-border text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-surface rounded text-xs uppercase tracking-[0.16em] font-semibold hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Authenticating Session..." : "Enter Atelier Console"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-admin-border text-center">
          <p className="text-[11px] text-espresso/60 font-light">
            Restricted access. All administrative actions are recorded in secure audit ledgers.
          </p>
        </div>
      </div>
    </div>
  );
}

