import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Khata.css";

function Khata() {

  const [khata, setKhata] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [payment, setPayment] = useState("");

  useEffect(() => {
    loadKhata();
  }, []);

  const loadKhata = async () => {
    try {
      const res = await api.get("khata/");
      setKhata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredKhata = khata.filter((item) =>
    item.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const collectPayment = async () => {

    if (!selectedId) {
      alert("Please select a customer.");
      return;
    }

    if (!payment || Number(payment) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    try {

      const res = await api.post(
        `khata/${selectedId}/collect_payment/`,
        {
          amount: Number(payment),
        }
      );

      console.log(res.data);

      alert("Payment Collected Successfully");

      setPayment("");
      setSelectedId(null);

      loadKhata();

    } catch (err) {

      console.log(err);

      if (err.response) {
        alert(JSON.stringify(err.response.data));
      } else {
        alert("Server Error");
      }

    }

  };

  const deleteRecord = async (id) => {

    if (!window.confirm("Delete this record?"))
      return;

    try {

      await api.delete(`khata/${id}/`);

      loadKhata();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="khata-container">

      <div className="khata-header">
        <h1>Khata Management</h1>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="khata-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Select</th>
            <th>Delete</th>
          </tr>

        </thead>

        <tbody>

          {filteredKhata.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.customer_name}</td>

              <td>₹{item.total_amount}</td>

              <td>₹{item.paid_amount}</td>

              <td
                className={
                  Number(item.balance) === 0
                    ? "paid"
                    : "balance"
                }
              >
                ₹{item.balance}
              </td>

              <td>

                <button
                  className="collect-btn"
                  onClick={() => setSelectedId(item.id)}
                >
                  {selectedId === item.id
                    ? "Selected"
                    : "Select"}
                </button>

              </td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => deleteRecord(item.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedId && (

        <div className="payment-box">

          <h2>Collect Payment</h2>

          <input
            type="number"
            className="payment-input"
            placeholder="Enter Payment Amount"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />

          <button
            className="collect-btn"
            onClick={collectPayment}
          >
            Collect Payment
          </button>

        </div>

      )}

    </div>

  );

}

export default Khata;