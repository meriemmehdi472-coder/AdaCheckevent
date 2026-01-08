import { useState, useMemo } from "react";
import { AffDesc } from "./components/AffDesc.jsx";
import { useFetchEvents } from "./hooks/usefetchevents.jsx";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import Dark from "./components/dark.jsx";

function App() {
  const { events, loading } = useFetchEvents();
  const [searchBar, setSearchBar] = useState("");
  const [dateOrder, setDateOrder] = useState("desc");

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        if (!searchBar) return true;
        return (
          event.title?.toLowerCase().includes(searchBar.toLowerCase()) ||
          event.name?.toLowerCase().includes(searchBar.toLowerCase()) ||
          event.titre_fr?.toLowerCase().includes(searchBar.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [events, searchBar, dateOrder]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors p-10 max-w-7xl mx-auto">

      {/* --- BARRE DU HAUT --- */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center justify-center gap-3 w-full md:w-2/3">
          {/* Bouton tri à gauche */}
          <button
            onClick={() => setDateOrder(dateOrder === "asc" ? "desc" : "asc")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Trier par date"
          >
            {dateOrder === "asc" ? (
              <ArrowDownNarrowWide size={20} />
            ) : (
              <ArrowUpNarrowWide size={20} />
            )}
          </button>

          {/* Barre de recherche centrée */}
          <input
            type="text"
            placeholder="🔍 Rechercher un évènement..."
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          {/* Bouton dark mode à droite */}
          <Dark />
        </div>
      </div>

      <AffDesc value={filteredEvents} loading={loading} />
    </div>
  );
}

export default App;
