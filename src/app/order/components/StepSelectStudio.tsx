import { StudioOption } from "../types/order";

const studios: StudioOption[] = [
  { id: "studio1", name: "Studio 1" },
  { id: "studio2", name: "Studio 2" },
  { id: "studio3", name: "Studio 3" },
];

export default function StepSelectStudio({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <label className="block mb-2 text-lg font-medium">Pilih Studio</label>
      <select
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Pilih Studio --</option>
        {studios.map((studio) => (
          <option key={studio.id} value={studio.id}>
            {studio.name}
          </option>
        ))}
      </select>

      <div className="mt-4 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!value}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
