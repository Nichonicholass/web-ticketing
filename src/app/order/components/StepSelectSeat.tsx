import React, { useState } from "react";

interface Seat {
  id: string;
  taken: boolean;
}

const generateSeats = (): Seat[][] => {
  const rows = 6; // A–F
  const cols = 10; // 1–10
  return Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: cols }, (_, colIdx) => ({
      id: `${String.fromCharCode(65 + rowIdx)}${colIdx + 1}`,
      taken: Math.random() < 0.2,
    })),
  );
};

const seatsData = generateSeats();

export default function StepSelectSeat({
  selected,
  onChange,
  onNext,
  onBack,
}: {
  selected: string[];
  onChange: (val: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [seats] = useState<Seat[][]>(seatsData);

  const toggleSeat = (seatId: string) => {
    if (selected.includes(seatId)) {
      onChange(selected.filter((id) => id !== seatId));
    } else {
      onChange([...selected, seatId]);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pilih Kursi</h2>

      <div className="grid gap-2">
        {seats.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 justify-center">
            {row.map((seat) => {
              const isSelected = selected.includes(seat.id);
              const baseStyle =
                "w-8 h-8 text-sm flex items-center justify-center rounded cursor-pointer border";
              const style = seat.taken
                ? "bg-red-500 text-white cursor-not-allowed"
                : isSelected
                  ? "bg-green-500 text-white"
                  : "bg-black text-white hover:bg-gray-700";

              return (
                <div
                  key={seat.id}
                  className={`${baseStyle} ${style}`}
                  onClick={() => !seat.taken && toggleSeat(seat.id)}
                >
                  {seat.id}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p>
          Total Kursi: <strong>{selected.length}</strong>
        </p>
        <p>
          Total Harga: <strong>Rp {selected.length * 50000}</strong>
        </p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Kembali
          </button>
          <button
            onClick={onNext}
            disabled={selected.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
