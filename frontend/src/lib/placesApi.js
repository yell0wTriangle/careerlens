const GOOGLE_PLACES_AUTOCOMPLETE_URL =
  "https://places.googleapis.com/v1/places:autocomplete";

function getApiKey() {
  return import.meta.env.VITE_GOOGLE_PLACES_API_KEY?.trim() || "";
}

export function hasPlacesApiKey() {
  return Boolean(getApiKey());
}

export async function fetchPlaceSuggestions(query, { signal } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing VITE_GOOGLE_PLACES_API_KEY");
  }

  const response = await fetch(GOOGLE_PLACES_AUTOCOMPLETE_URL, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "suggestions.placePrediction.text.text,suggestions.queryPrediction.text.text",
    },
    body: JSON.stringify({
      input: query,
      languageCode: "en",
    }),
  });

  if (!response.ok) {
    throw new Error(`Places API request failed: ${response.status}`);
  }

  const data = await response.json();
  const suggestions = data?.suggestions || [];
  const texts = suggestions
    .map((item) => {
      if (item.placePrediction?.text?.text) {
        return item.placePrediction.text.text;
      }
      if (item.queryPrediction?.text?.text) {
        return item.queryPrediction.text.text;
      }
      return "";
    })
    .filter(Boolean);

  return Array.from(new Set(texts));
}
