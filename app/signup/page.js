"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Join Plankton</h1>
        <p className="text-sm text-gray-500 mb-6">
          Create an account to join events and make an impact.
        </p>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
