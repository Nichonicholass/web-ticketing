"use client";

import { useState } from "react";
import StepSelectFilm from "./components/StepSelectFilm";
import StepSelectStudio from "./components/StepSelectStudio";
import StepSelectSchedule from "./components/StepSelectSchedule";
import StepSelectSeat from "./components/StepSelectSeat";
import StepSummary from "./components/StepSummary";
import StepPayment from "./components/StepPayment";
import { FilmOption, OrderPayload, StudioOption } from "./types/order";

const steps = ["film", "studio", "jadwal", "kursi", "summary", "payment"];

const films: FilmOption[] = [
  { id: "film1", title: "The Mystery Island" },
  { id: "film2", title: "Guardian of Galaxy Cats" },
];

const studios: StudioOption[] = [
  { id: "studio1", name: "Studio 1" },
  { id: "studio2", name: "Studio 2" },
];

const schedules = ["13:00", "15:00", "17:00"];

const seats = Array.from({ length: 6 }, (_, rowIdx) =>
  Array.from({ length: 10 }, (_, colIdx) => ({
    id: `${String.fromCharCode(65 + rowIdx)}${colIdx + 1}`,
    taken: Math.random() < 0.2, // random kursi penuh
  })),
);

export default function OrderPage() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<OrderPayload>({
    id_film: "",
    id_studio: "",
    jadwal: "",
    id_kursi: [],
    total_kursi: 0,
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleConfirm = () => {
    console.log("Payload yang akan dikirim:", order);
    alert("Pembayaran berhasil!");
    //   window.location.href = '/tickets';
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Pesan Tiket</h1>

      {step === 0 && (
        <StepSelectFilm
          value={order.id_film}
          onChange={(val) => setOrder({ ...order, id_film: val })}
          onNext={next}
        />
      )}

      {step === 1 && (
        <StepSelectStudio
          value={order.id_studio}
          onChange={(val) => setOrder({ ...order, id_studio: val })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 2 && (
        <StepSelectSchedule
          value={order.jadwal}
          onChange={(val) => setOrder({ ...order, jadwal: val })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <StepSelectSeat
          selected={order.id_kursi}
          onChange={(seats) =>
            setOrder({ ...order, id_kursi: seats, total_kursi: seats.length })
          }
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && <StepSummary order={order} onNext={next} onBack={back} />}

      {step === 5 && (
        <StepPayment onBack={back} onConfirm={handleConfirm} />

        // <StepPayment onBack={back} onConfirm={() => {
        //   alert('Pembayaran berhasil!');
        // //   window.location.href = '/tickets';
        // }}
        // />
      )}
    </main>
  );
}
