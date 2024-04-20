import Link from "next/link";

export default function Nav() {
  return (
    <nav className="py-4 px-6 relative top-0 left-0 z-50 w-full bg-emerald-600">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <header className="flex items-center">
          <Link className="text-white text-lg font-bold" href="/">Terminal Venado Tuerto</Link>
          <a href="#" className="text-white ml-8">Viajes a Venado</a>
        </header>
        <div className="flex items-center">
          <a href="#" className="text-white mr-4">Buscar</a>
        </div>
      </div>
    </nav>
  );
};