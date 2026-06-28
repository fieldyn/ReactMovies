import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route
              path="popular"
              element={<CategoryPage title="Popular" path="/movie/popular" />}
            />
            <Route
              path="top-rated"
              element={<CategoryPage title="Top Rated" path="/movie/top_rated" />}
            />
            <Route
              path="upcoming"
              element={<CategoryPage title="Upcoming" path="/movie/upcoming" />}
            />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
