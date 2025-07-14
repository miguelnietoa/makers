import { Link, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function ShareGroup() {
  const navigate = useNavigate();

  // 🔧 Valor fijo de ejemplo para el QR
  const inviteUrl = "https://woopi.com/join/1234";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Share your group
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <QRCode value={inviteUrl} size={180} />
      </div>

      <p className="text-sm text-center break-all mb-4 text-gray-600">
        {inviteUrl}
      </p>

      <button
        type="button"
        onClick={() => {
          void navigator.clipboard.writeText(inviteUrl);
        }}
        className="mb-8 bg-primary hover:bg-primary/80 text-black px-4 py-2 rounded-lg transition"
      >
        Copiar enlace
      </button>

      <Link
        to="/groups"
        className="text-primary underline text-sm"
        onClick={() => navigate("/groups")}
      >
        ← Back to groups
      </Link>
    </div>
  );
}
