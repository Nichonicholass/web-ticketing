export default function StepPayment({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">Pembayaran</h2>

      <div className="bg-white p-4 rounded shadow inline-block">
        <p className="mb-2">Scan untuk membayar:</p>
        <div className="w-40 h-40 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-700">[BARCODE]</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Kembali
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Bayar
        </button>
      </div>
    </div>
  );
}
