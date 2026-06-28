import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/popular", label: "Popular", end: false },
  { to: "/top-rated", label: "Top Rated", end: false },
  { to: "/upcoming", label: "Upcoming", end: false },
  { to: "/favorites", label: "Favorites", end: false },
];

export default function Navbar() {
  return (
    <nav className="mt-5 flex justify-center">
      <ul className="flex flex-wrap items-center gap-2 rounded-full bg-light-100/5 px-3 py-2">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-light-100/10 text-white"
                    : "text-light-200 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
