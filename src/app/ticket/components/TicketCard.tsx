"use client";

import React from "react";

export interface Ticket {
  id: string;
  filmTitle: string;
  filmImage: string;
  studio: string;
  schedule: string;
  seats: string[];
  status: "upcoming" | "past";
}

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const isUpcoming = ticket.status === "upcoming";

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col sm:flex-row transition hover:shadow-lg">
      <img
        src={ticket.filmImage}
        alt={ticket.filmTitle}
        className="w-full sm:w-40 h-56 object-cover"
      />
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-1">{ticket.filmTitle}</h2>
        <p className="text-sm text-gray-600">🗓️ {ticket.schedule}</p>
        <p className="text-sm text-gray-600">
          🎟️ Kursi: {ticket.seats.join(", ")}
        </p>
        <p className="text-sm text-gray-600">🏢 {ticket.studio}</p>
        <span
          className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${
            isUpcoming
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {isUpcoming ? "Akan Datang" : "Selesai"}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
