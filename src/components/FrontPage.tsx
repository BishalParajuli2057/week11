import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import type { Joke } from "../hooks/useJokes";

type FrontPageProps = {
  saveJoke?: (joke: Joke) => void; // optional as required
};

export default function FrontPage({ saveJoke }: FrontPageProps) {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchJoke = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://official-joke-api.appspot.com/random_joke",
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch a joke");

        const data: Joke = await res.json();
        setJoke(data);
      } catch (err) {
        // Abort is expected during cleanup; don't treat as "error UI" for this task
        if ((err as { name?: string }).name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();

    return () => {
      controller.abort(); // cleanup
    };
  }, [refreshIndex]);

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Button variant="contained" onClick={() => setRefreshIndex((v) => v + 1)}>
        Generate random joke
      </Button>

      {loading && <Typography>Loading a joke...</Typography>}

      {!loading && joke && (
        <Card key={joke.id}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {joke.setup}
            </Typography>
            <Typography variant="body1">{joke.punchline}</Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => saveJoke?.(joke)}
                disabled={!saveJoke}
              >
                Save joke
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
