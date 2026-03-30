import { useEffect, useMemo, useState } from "react";
import { fetchPlaceSuggestions, hasPlacesApiKey } from "../lib/placesApi";

function fallbackFilter(query, fallbackLocations) {
  if (!query.trim()) return [];
  const lower = query.toLowerCase();
  return fallbackLocations.filter((loc) => loc.toLowerCase().includes(lower));
}

export default function usePlacesAutocomplete(query, fallbackLocations = []) {
  const [apiSuggestions, setApiSuggestions] = useState([]);

  const fallbackSuggestions = useMemo(
    () => fallbackFilter(query, fallbackLocations),
    [query, fallbackLocations],
  );

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2 || !hasPlacesApiKey()) {
      setApiSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const results = await fetchPlaceSuggestions(trimmed, {
          signal: controller.signal,
        });
        setApiSuggestions(results);
      } catch {
        setApiSuggestions([]);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  if (apiSuggestions.length > 0) return apiSuggestions;
  return fallbackSuggestions;
}
