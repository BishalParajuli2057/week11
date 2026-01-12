import { useState } from "react";

export type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

export function useJokes() {
  const [savedJokes, setSavedJokes] = useState<Joke[]>([]);

  const saveJoke = (joke: Joke) => {
    setSavedJokes((prev) => {
      // avoid duplicates by id
      if (prev.some((j) => j.id === joke.id)) return prev;
      return [...prev, joke];
    });
  };

  const deleteJoke = (id: number) => {
    setSavedJokes((prev) => prev.filter((j) => j.id !== id));
  };

  return { savedJokes, saveJoke, deleteJoke };
}
