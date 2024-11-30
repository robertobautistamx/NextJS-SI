import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión de Notas",
  description: "Plataforma para la gestión de notas de estudiantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-Inter bg-gray_secondary text-gray_primary antialiased">
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Notas</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/notas" className="hover:underline">
                  Notas
                </a>
              </li>
              <li>
                <a href="/configuracion" className="hover:underline">
                  Configuración
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-6">{children}</main>
        <footer className="bg-gray_primary text-center text-sm p-4">
          <p>© 2024 Gestión de Notas. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
