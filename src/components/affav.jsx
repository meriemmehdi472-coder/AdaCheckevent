import React, { useState, useEffect } from "react";

export default function Favoris({ value, liked }) {
  // value : tous les événements
  // liked : objet { [id]: true/false }

  if (!value || !Array.isArray(value)) return null;

  // On ne garde que les événements likés
  const likedEvents = value.filter((event) => liked[event.id]);

  if (likedEvents.length === 0) {
    return (
      <p className="text-center mt-6 text-lg">
        Aucun favori pour le moment ⭐
      </p>
    );
  }

  return (
    <ul className="space-y-6 mt-6">
      {likedEvents.map((f) => (
        <li key={f.id} className="flex flex-col gap-3 border-b pb-4">
          {f.cover_url && (
            <img
              src={f.cover_url}
              alt={f.title}
              className="rounded-xl w-full md:w-64 h-56 object-cover"
            />
          )}

          <h2 className="text-xl font-semibold">{f.title}</h2>

          {f.lead_text && <p className="text-gray-600">{f.lead_text}</p>}

          {f.url && (
            <button
              onClick={() => window.open(f.url, "_blank")}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-fit"
            >
              Voir l'évènement
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
