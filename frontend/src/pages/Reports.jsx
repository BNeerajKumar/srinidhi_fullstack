import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Reports.css";

function Reports() {

  // ===========================
  // STATE
  // ===========================

  const [report, setReport] = useState({
    total_customers: 0,
    total_products: 0,
    total_bills: 0,
    total_sales: 0,
    total_credit: 0,
    low_stock_products: 0,
  });

  const [loading, setLoading] = useState(true);

  // ===========================
  // LOAD REPORT
  // ===========================

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

    try {

      const res = await api.get("reports/");

      setReport(res.data);

    } catch (err) {

      console.log(err);

      alert("Unable to load reports.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <h2>Loading Reports...</h2>;
  }

  return (

    <div className="reports-container">

      <h1>Reports Dashboard</h1>

      <div className="report-grid">

        <div className="report-card">
          <h2>Total Customers</h2>
          <h1>{report.total_customers}</h1>
        </div>

        <div className="report-card">
          <h2>Total Products</h2>
          <h1>{report.total_products}</h1>
        </div>

        <div className="report-card">
          <h2>Total Bills</h2>
          <h1>{report.total_bills}</h1>
        </div>

        <div className="report-card">
          <h2>Total Sales</h2>
          <h1>₹{report.total_sales}</h1>
        </div>

        <div className="report-card">
          <h2>Total Credit</h2>
          <h1>₹{report.total_credit}</h1>
        </div>

        <div className="report-card">
          <h2>Low Stock Products</h2>
          <h1>{report.low_stock_products}</h1>
        </div>

      </div>
            {/* ===========================
          BUSINESS SUMMARY
      =========================== */}

      <div className="summary-section">

        <h2>Business Summary</h2>

        <table className="summary-table">

          <tbody>

            <tr>
              <td>Total Customers</td>
              <td>{report.total_customers}</td>
            </tr>

            <tr>
              <td>Total Products</td>
              <td>{report.total_products}</td>
            </tr>

            <tr>
              <td>Total Bills</td>
              <td>{report.total_bills}</td>
            </tr>

            <tr>
              <td>Total Sales</td>
              <td>₹{report.total_sales}</td>
            </tr>

            <tr>
              <td>Total Credit</td>
              <td>₹{report.total_credit}</td>
            </tr>

            <tr>
              <td>Low Stock Products</td>
              <td>{report.low_stock_products}</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* ===========================
          QUICK INSIGHTS
      =========================== */}

      <div className="insights-section">

        <h2>Quick Insights</h2>

        <ul>

          <li>
            👥 Registered Customers :
            <strong> {report.total_customers}</strong>
          </li>

          <li>
            📦 Available Products :
            <strong> {report.total_products}</strong>
          </li>

          <li>
            🧾 Bills Generated :
            <strong> {report.total_bills}</strong>
          </li>

          <li>
            💰 Total Sales :
            <strong> ₹{report.total_sales}</strong>
          </li>

          <li>
            💳 Outstanding Credit :
            <strong> ₹{report.total_credit}</strong>
          </li>

          <li>
            ⚠️ Low Stock Items :
            <strong> {report.low_stock_products}</strong>
          </li>

        </ul>

      </div>

      {/* ===========================
          REFRESH BUTTON
      =========================== */}

      <div className="report-actions">

        <button
          className="refresh-btn"
          onClick={loadReport}
        >
          Refresh Report
        </button>

      </div>

    </div>

  );

}

export default Reports;