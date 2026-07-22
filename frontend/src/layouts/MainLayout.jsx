import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "270px",
          minHeight: "100vh",
          background: "#0B1120",
        }}
      >
        <Navbar />

        <div style={{ padding: "30px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;