import { useState } from "react";

export type LoginProps = {
  loading?: boolean;
  error?: string;
  onSubmit: (data: { email: string; password: string }) => void;
};

export const Login = ({ loading = false, error, onSubmit }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 p-6 rounded-xl bg-white shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Iniciar sesión</h2>

      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
};
