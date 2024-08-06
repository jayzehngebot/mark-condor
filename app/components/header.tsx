// header comp
'use client'

export default function Header() {


  return (
      <header className="bg-slate-100 h-10">
          
          {/* <Main Nav Sections */}
          <nav className="flex items-center justify-between p-2 mt-1">
            <h1 className="ml-2 sm:ml-4 md:ml-10"><a href="/">Condor Method</a></h1>
            <div id="sections" className="hidden sm:flex">
              <a href="/shop" className="mr-6 hover:underline">Shop</a>
              <a href="/projects" className="mr-6 hover:underline">Projects</a>
              <a href="/testimony" className="mr-6 hover:underline">Testimony</a>
              <a href="/hire" className="mr-6 hover:underline">You x MC</a>
              <a href="/thoughts" className="mr-6 hover:underline">Thoughts</a>
              <a href="/about" className="mr-6 hover:underline">About</a>
            </div>
          </nav>
          

      </header>
  );
}