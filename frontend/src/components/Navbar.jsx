import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <h2>Shop Management System</h2>

      <div className="profile">
        <span>👤</span>
        <span>Admin</span>
      </div>
    </header>
  );
}

export default Navbar;