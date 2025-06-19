import { OrderPayload } from "../types/order";

export default function StepSummary({
  order,
  onNext,
  onBack,
}: {
  order: OrderPayload;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ringkasan Pemesanan</h2>
      <div className="bg-white rounded p-4 shadow">
        <p>
          <strong>Film:</strong> {order.id_film}
        </p>
        <p>
          <strong>Studio:</strong> {order.id_studio}
        </p>
        <p>
          <strong>Jadwal:</strong> {order.jadwal}
        </p>
        <p>
          <strong>Kursi:</strong> {order.id_kursi.join(", ")}
        </p>
        <p>
          <strong>Total Kursi:</strong> {order.total_kursi}
        </p>
        <p>
          <strong>Total Harga:</strong> Rp {order.total_kursi * 50000}
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Bayar
        </button>
      </div>
    </div>
  );
}
