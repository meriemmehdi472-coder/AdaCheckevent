import { useEffect, useState } from "react";

export function useFetchEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // API 
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100"
        );
        const data = await response.json();
        console.log( data);

        // 🔹 La structure actuelle contient "results"
        if (Array.isArray(data.results)) {
          setEvents(data.results);
        } else {
          console.error("Structure inattendue :", data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l’API :", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { events, loading };
}
