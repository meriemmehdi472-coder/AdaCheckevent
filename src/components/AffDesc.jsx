import React, { useState } from "react";
import Fav from "./fav";

const getStoredLikes = () => {
  try {
    return JSON.parse(localStorage.getItem("likedEvents")) || {};
  } catch {
    return {};
  }
};

export function AffDesc({ value, loading }) {
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(getStoredLikes);
  const [showFavorites, setShowFavorites] = useState(false);

  const itemsPerPage = 12;
  const descLimit = 95;

  const toggleLike = (id) => {
    setLiked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("likedEvents", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleText = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <p className="text-center">Chargement...</p>;
  if (!value || value.length === 0)
    return <p className="text-center">Aucun évènement trouvé</p>;

  const filteredEvents = showFavorites
    ? value.filter((item) => liked[item.id])
    : value;

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const current = filteredEvents.slice(start, start + itemsPerPage);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:to-slate-800 min-h-screen py-6">
      {/* Bouton favoris amélioré */}
      <div className="mb-8 flex justify-center">
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className="px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
        >
          {showFavorites ? "🎟️ Voir tous les événements" : "💖 Voir mes favoris"}
        </button>
      </div>

      {/* Liste - mêmes dimensions */}
      <ul className="space-y-6 max-w-6xl mx-auto px-4">
        {current.map((f) => {
          const id = f.id;
          return (
            <li
              key={id}
              className="flex items-start gap-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-lg rounded-xl p-5 hover:shadow-xl hover:border-purple-300/30 dark:hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Image - mêmes dimensions */}
              {f.cover_url && (
                <img
                  src={f.cover_url}
                  alt={f.title}
                  className="w-[300px] h-auto object-cover rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 flex-shrink-0 shadow-md"
                />
              )}

              {/* Contenu texte - mêmes dimensions */}
              <div className="flex flex-col flex-1">
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {f.title}
                </h2>

                {f.lead_text && (
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-3 font-medium">
                    {f.lead_text}
                  </p>
                )}

                {f.description && (
                  <div
                    className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: expanded[id]
                        ? f.description
                        : (f.description || "").slice(0, descLimit) + "...",
                    }}
                  />
                )}

                <div className="flex flex-wrap gap-3 mt-auto">
                  {f.description && f.description.length > descLimit && (
                    <button
                      onClick={() => toggleText(id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      {expanded[id] ? "Voir moins" : "Voir plus"}
                    </button>
                  )}

                  {f.url && (
                    <button
                      onClick={() => window.open(f.url, "_blank")}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Lien
                    </button>
                  )}

                  <Fav
                    id={id}
                    isLiked={liked[id] || false}
                    onToggleLike={() => toggleLike(id)}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination améliorée */}
      {filteredEvents.length > itemsPerPage && (
        <div className="flex items-center gap-4 justify-center mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg backdrop-blur-sm"
          >
            Précédent
          </button>
          <span className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium backdrop-blur-sm">
            Page <span className="font-bold text-purple-600 dark:text-purple-400">{page}</span> / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg backdrop-blur-sm"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Badge techno discret */}
      <div className="text-center mt-8 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          React.js • Tailwind CSS • Modern UI
        </p>
      </div>
    </div>
  );
}