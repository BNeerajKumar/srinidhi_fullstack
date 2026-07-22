import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [report, setReport] = useState({
    total_customers: 0,
    total_products: 0,
    total_bills: 0,
    total_sales: 0,
    today_sales: 0,
    total_credit: 0,
    low_stock_products: [],
    recent_bills: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("reports/");
      setReport(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
};

  return (
    <div className="dashboard">

      <h1 className="page-title">
        Dashboard
      </h1>
      <button className="logout-btn" onClick={handleLogout}>
    Logout
</button>

      {/* Cards */}

      <div className="cards-grid">

        <DashboardCard
          title="Customers"
          value={report.total_customers}
          icon="👥"
        />

        <DashboardCard
          title="Products"
          value={report.total_products}
          icon="📦"
        />

        <DashboardCard
          title="Bills"
          value={report.total_bills}
          icon="🧾"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${report.total_sales}`}
          icon="💰"
        />

      </div>

      {/* Bottom Section */}

      <div className="dashboard-bottom">

        {/* Today's Sales */}

        <div className="sales-card">

          <h2>Today's Sales</h2>

          <h1>₹{report.today_sales}</h1>

        </div>

        {/* Low Stock */}

        <div className="low-stock">

          <h2>Low Stock Products</h2>

          <table>

            <thead>

              <tr>
                <th>Product</th>
                <th>Qty</th>
              </tr>

            </thead>

            <tbody>

              {report.low_stock_products.length > 0 ? (

                report.low_stock_products.map((item, index) => (

                  <tr key={index}>

                    <td>{item.name}</td>

                    <td>{item.quantity}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="2">
                    No Low Stock Products
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Recent Bills */}

      <div className="recent-bills">

        <h2>Recent Bills</h2>

        <table>

          <thead>

            <tr>

              <th>Bill No</th>

              <th>Customer</th>

              <th>Amount</th>

              <th>Payment</th>

            </tr>

          </thead>

          <tbody>

            {report.recent_bills.length > 0 ? (

              report.recent_bills.map((bill) => (

                <tr key={bill.id}>

                  <td>{bill.id}</td>

                  <td>{bill.customer}</td>

                  <td>₹{bill.amount}</td>

                  <td>{bill.payment}</td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="4">
                  No Bills Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;