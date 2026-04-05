"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-green-600">
        🪸 Plankton
      </Link>
      <div className="flex gap-4 text-sm text-gray-600 items-center">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        {user ? (
          <>
            <span className="text-gray-400">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-green-600">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
