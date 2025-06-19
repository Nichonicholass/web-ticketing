"use client";

import { useState } from "react";
import TicketCard, { Ticket } from "./components/TicketCard";

const dummyTickets: Ticket[] = [
  {
    id: "1",
    filmTitle: "The Mystery Island",
    filmImage: "https://source.unsplash.com/400x600/?movie",
    studio: "Studio 1, Jakarta Cinema XXI",
    schedule: "2025-06-22 15:00",
    seats: ["A3", "A4"],
    status: "upcoming",
  },
  {
    id: "2",
    filmTitle: "Love Beyond Time",
    filmImage: "https://source.unsplash.com/400x600/?romance",
    studio: "Studio 2, Galaxy Mall XXI",
    schedule: "2025-05-12 13:00",
    seats: ["B2", "B3"],
    status: "past",
  },
  {
    id: "3",
    filmTitle: "Guardian of Galaxy Cats",
    filmImage: "https://source.unsplash.com/400x600/?cats",
    studio: "Studio 3, Tunjungan XXI",
    schedule: "2025-06-25 17:00",
    seats: ["C1"],
    status: "upcoming",
  },
];

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const filteredTickets = dummyTickets.filter((t) => t.status === activeTab);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Tiket Saya</h1>

      {/* Tab */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Akan Ditonton
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "past"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Riwayat
        </button>
      </div>

      {/* List Tiket */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada tiket.</p>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </main>
  );
}
