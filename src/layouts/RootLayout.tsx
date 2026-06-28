import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// Layout comun a todas las rutas: fondo, wrapper, navbar y el <Outlet>
// donde React Router inyecta la pagina activa.
export default function RootLayout() {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
}
