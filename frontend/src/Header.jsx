function Header() {

  
  return (
    <header className="mb-4 sm:col-span-2 lg:col-span-3">
      {/* The Outer Header spans 100% width */}

      <div className=" mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex justify-between items-center">
        {/* This inner div is centered with mx-auto and has margins via max-width */}

        <div>
          <h1 className="text-3xl font-bold">
            AeroGuard <span className="text-indigo-500">AI</span>
          </h1>
          {/* <p className="text-slate-400 text-sm">JNU Campus Monitoring</p> */}
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-emerald-500">SYSTEM_ONLINE</span>
        </div>
      </div>
    </header>
  )
}

export default Header;