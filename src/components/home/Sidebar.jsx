export default function DashboardLayout() {

  return (
    <div>


      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-[#121212] border-r border-[#1e1e1e]">
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-white">
            <li><a href="/home" className="flex items-center p-2 hover:bg-[#1e1e1e] hover:text-red-600 rounded-lg"> <span className="ml-3">Home</span></a></li>
            <li><a href="/criar-torneio" className="flex items-center p-2 hover:bg-[#1e1e1e] hover:text-red-600 rounded-lg"> <span className="ml-3">Criar torneio</span></a></li>
            <li><a href="/torneios" className="flex items-center p-2 hover:bg-[#1e1e1e] hover:text-red-600 rounded-lg"> <span className="ml-3">Buscar</span></a></li>
            <li><a href="/perfil" className="flex items-center p-2 hover:bg-[#1e1e1e] hover:text-red-600 rounded-lg"> <span className="ml-3">Perfil</span></a></li>
            <li><a href="/logout" className="flex items-center p-2 hover:bg-[#1e1e1e] hover:text-red-600 rounded-lg"> <span className="ml-3">Sign Out</span></a></li>
          </ul>
        </div>
      </aside>

      
      
    </div>
  );
}
