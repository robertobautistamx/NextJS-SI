"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="bg-white rounded-md shadow-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Bienvenido a la Gestión de Notas</h1>
      <p className="text-lg mb-6">
        Organiza tus tareas y notas en categorías personalizadas y gestiona tu productividad.
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
        >
          Disminuir
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
        >
          Incrementar
        </button>
      </div>
    </div>
  );
}