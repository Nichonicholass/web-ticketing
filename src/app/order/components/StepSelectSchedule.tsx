const schedules = ["13:00", "15:00", "17:00"];

export default function StepSelectSchedule({
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
      <h2 className="text-lg font-semibold mb-4">Pilih Jadwal</h2>
      <div className="flex gap-4 justify-center mb-6">
        {schedules.map((time) => (
          <button
            key={time}
            onClick={() => onChange(time)}
            className={`px-4 py-2 rounded border ${
              value === time
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
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
