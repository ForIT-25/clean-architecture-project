import { useState } from "react";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

type RegisterProps = {
  loading?: boolean;
  error?: string;
  onSubmit: (data: RegisterData) => void;
};

export const Register = ({
  loading = false,
  error,
  onSubmit,
}: RegisterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password, confirm });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 p-6 rounded-xl bg-white shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Crear cuenta</h2>

      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Nombre</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

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
        <label className="text-sm text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Repetir contraseña</label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Creando cuenta..." : "Registrarse"}
      </button>
    </form>
  );
};
