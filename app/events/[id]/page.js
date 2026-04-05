import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categoryColors = {
  Cleanup: "bg-blue-100 text-blue-700",
  Education: "bg-yellow-100 text-yellow-700",
  Environment: "bg-green-100 text-green-700",
};

export default async function EventPage({ params }) {
  const { id } = await params;

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Event not found</h1>
          <Link href="/" className="text-green-600 mt-4 block hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">🪸 Plankton</span>
        <div className="flex gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <Link href="/events" className="hover:text-green-600">
            Events
          </Link>
        </div>
      </nav>

      {/* Event Detail */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/" className="text-sm text-green-600 hover:underline">
          ← Back to Events
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}
          >
            {event.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
            {event.title}
          </h1>

          <p className="text-sm text-gray-500 mb-1">📍 {event.location}</p>
          <p className="text-sm text-gray-500 mb-1">📅 {event.date}</p>
          <p className="text-sm text-gray-500 mb-4">
            👥 {event.spots} spots available
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {event.description}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            🧑 Organizer: <span className="font-medium">{event.organizer}</span>
          </p>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            Join This Event
          </button>
        </div>
      </section>
    </main>
  );
}
