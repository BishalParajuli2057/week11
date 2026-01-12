import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import type { Joke } from "../hooks/useJokes";

type SavedPageProps = {
  savedJokes: Joke[];
  deleteJoke: (id: number) => void;
};

export default function SavedPage({ savedJokes, deleteJoke }: SavedPageProps) {
  if (savedJokes.length === 0) {
    return <Typography sx={{ p: 2 }}>No saved jokes yet.</Typography>;
  }

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {savedJokes.map((joke) => (
        <Card key={joke.id}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {joke.setup}
            </Typography>
            <Typography variant="body1">{joke.punchline}</Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => deleteJoke(joke.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
