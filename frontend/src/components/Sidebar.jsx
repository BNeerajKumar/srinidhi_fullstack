import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBoxes,
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaTruck,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Customers", path: "/customers", icon: <FaUsers /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxes /> },
    { name: "Billing", path: "/billing", icon: <FaFileInvoice /> },
    { name: "Khata", path: "/khata", icon: <FaMoneyCheckAlt /> },
    { name: "Suppliers", path: "/suppliers", icon: <FaTruck /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
   
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">🟣</span>
        <div>
          <h2>Srinidhi</h2>
          <p>Electronics</p>
        </div>
      </div>

      <nav className="menu">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;