import { PredictionResponse, SentenceInput, Rating } from "./types";

const BASE_URL = "http://127.0.0.1:8000";

export async function predictSentiment(
  input: SentenceInput,
): Promise<PredictionResponse> {
  return apiRequest<PredictionResponse>("/predict/", "POST", input );
}

export async function saveRating(
  count: Rating,
): Promise<PredictionResponse> {
  return apiRequest<PredictionResponse>("/rating/", "POST", count);
}

async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<T> {
  console.log(body)
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}
