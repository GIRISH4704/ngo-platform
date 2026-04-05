import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Marina Beach Cleanup",
    category: "Cleanup",
    location: "Marina Beach, Chennai",
    date: "April 12, 2026",
    spots: 20,
    description:
      "Join us for a morning cleanup drive at Marina Beach. Gloves and bags will be provided. Let's keep our beach clean together.",
    organizer: "Green Chennai Initiative",
  },
  {
    id: 2,
    title: "Book Donation Drive",
    category: "Education",
    location: "Adyar, Chennai",
    date: "April 15, 2026",
    spots: 10,
    description:
      "Collecting books for underprivileged children in Adyar. Bring any books in good condition — textbooks, storybooks, anything helps.",
    organizer: "Read India Foundation",
  },
  {
    id: 3,
    title: "Tree Planting Drive",
    category: "Environment",
    location: "Cubbon Park, Chennai",
    date: "April 18, 2026",
    spots: 30,
    description:
      "A community tree planting event to increase green cover in the city. Saplings will be provided. Come with your family!",
    organizer: "EcoWarriors Chennai",
  },
];

const categoryColors = {
  Cleanup: "bg-blue-100 text-blue-700",
  Education: "bg-yellow-100 text-yellow-700",
  Environment: "bg-green-100 text-green-700",
};

export default async function EventPage({ params }) {
  const { id } = await params;
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
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
            className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[event.category]}`}
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
            🧑‍organizer: <span className="font-medium">{event.organizer}</span>
          </p>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            Join This Event
          </button>
        </div>
      </section>
    </main>
  );
}
