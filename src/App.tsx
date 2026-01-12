import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./pages/FrontPage";
import SavedPage from "./pages/SavedPage";
import { useJokes } from "./hooks/useJokes";

export default function App() {
  const { savedJokes, saveJoke, deleteJoke } = useJokes();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage saveJoke={saveJoke} />} />
        <Route
          path="/saved"
          element={
            <SavedPage savedJokes={savedJokes} deleteJoke={deleteJoke} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
