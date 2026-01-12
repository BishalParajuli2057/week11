import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import type { Joke } from "../hooks/useJokes";

type FrontPageProps = {
  saveJoke?: (joke: Joke) => void;
};

export default function FrontPage({ saveJoke }: FrontPageProps) {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchJoke = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          "https://official-joke-api.appspot.com/random_joke",
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data: Joke = await res.json();
        setJoke(data);
      } catch (e) {
        if ((e as { name?: string }).name !== "AbortError") {
          setError("Failed to fetch");
          setJoke(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();

    return () => controller.abort();
  }, [trigger]);

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {/* IMPORTANT: text must match the test */}
      <Button variant="contained" onClick={() => setTrigger((v) => v + 1)}>
        Get Joke
      </Button>

      {loading && <Typography>Loading a joke...</Typography>}

      {!loading && error && <Typography>{error}</Typography>}

      {!loading && !error && joke && (
        <Card key={joke.id}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {joke.setup}
            </Typography>
            <Typography>{joke.punchline}</Typography>

            {saveJoke && (
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => saveJoke(joke)}
              >
                Save joke
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
