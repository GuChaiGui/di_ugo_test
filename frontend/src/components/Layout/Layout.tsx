import { useState } from "react";
import "./Layout.scss";
import logo from "../../assets/logo_di.png";
import { NavLink } from "react-router-dom";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="app-layout">
      <header
        className="app-header"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* LOGO */}
        <div className={`logo ${hovered ? "logo-hide" : ""}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* CUSTOMERS */}
        <div className={`menu ${hovered ? "menu-show" : ""}`}>
            <NavLink to="/customers" className="nav-link">
                Customers
            </NavLink>
        </div>
      </header>

      <main className="app-content">{children}</main>
    </div>
  );
}
