"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function JoinButton({ eventId }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;
      setUser(currentUser);

      if (currentUser) {
        const { data: existing } = await supabase
          .from("participations")
          .select("id")
          .eq("user_id", currentUser.id)
          .eq("event_id", eventId)
          .single();

        if (existing) setJoined(true);
      }

      setLoading(false);
    };

    init();
  }, [eventId]);

  const handleJoin = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("participations").insert({
      user_id: user.id,
      event_id: eventId,
    });

    if (!error) setJoined(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <button className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl text-sm font-semibold">
        Loading...
      </button>
    );
  }

  if (joined) {
    return (
      <button className="w-full bg-green-100 text-green-700 py-3 rounded-xl text-sm font-semibold">
        ✅ You have joined this event
      </button>
    );
  }

  return (
    <button
      onClick={handleJoin}
      className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition"
    >
      {user ? "Join This Event" : "Log in to Join"}
    </button>
  );
}
