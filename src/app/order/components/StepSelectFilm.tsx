import { FilmOption } from "../types/order";

const films: FilmOption[] = [
  { id: "film1", title: "The Mystery Island" },
  { id: "film2", title: "Guardian of Galaxy Cats" },
];

export default function ({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <label className="block mb-2 text-lg font-medium">Pilih Film</label>
      <select
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Pilih Film --</option>
        {films.map((film) => (
          <option key={film.id} value={film.id}>
            {film.title}
          </option>
        ))}
      </select>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={!value}
        onClick={onNext}
      >
        Selanjutnya
      </button>
    </div>
  );
}
