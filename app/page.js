import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/app/components/Navbar";

const categoryColors = {
  Cleanup: "bg-blue-100 text-blue-700",
  Education: "bg-yellow-100 text-yellow-700",
  Environment: "bg-green-100 text-green-700",
};

export default async function Home() {
  const { data: events, error } = await supabase.from("events").select("*");

  if (error) {
    console.error(error);
    return <p>Failed to load events.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find events that matter.
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Plankton connects you with community-driven events in Chennai —
          cleanups, drives, and initiatives led by real people.
        </p>
      </section>

      {/* Event Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
            >
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}
              >
                {event.category}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mt-3 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500">📍 {event.location}</p>
              <p className="text-sm text-gray-500">📅 {event.date}</p>
              <p className="text-sm text-gray-500 mt-1">
                👥 {event.spots} spots available
              </p>
              <Link
                href={`/events/${event.id}`}
                className="mt-4 block text-center bg-green-600 text-white text-sm py-2 rounded-xl hover:bg-green-700 transition"
              >
                View Event
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
