export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-8 py-6">
      <div className="flex items-center gap-2">
        <span
          id="navbar-title"
          className="text-xl font-light tracking-[0.3em] font-headline cursor-pointer drop-shadow-md hero-title-outline opacity-0 pointer-events-none"
        >
          ØRBIT#0B1T
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-white/20 rounded-full transition-all p-2 active:scale-95 duration-200">
          <span className="material-symbols-outlined text-white">visibility</span>
        </button>
      </div>
    </nav>
  );
}
