import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("customers/");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load customers.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomer = async () => {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.village.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`customers/${editingId}/`, form);
        setEditingId(null);
      } else {
        await api.post("customers/", form);
      }

      setForm({
        name: "",
        phone: "",
        village: "",
      });

      loadCustomers();
    } catch (err) {
      console.error(err);
      alert("Unable to save customer.");
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);

    setForm({
      name: customer.name,
      phone: customer.phone,
      village: customer.village,
    });
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`customers/${id}/`);
      loadCustomers();
    } catch (err) {
      console.error(err);
      alert("Unable to delete customer.");
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      customer.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1>Customers</h1>

        <button className="add-btn" onClick={saveCustomer}>
          {editingId ? "Update Customer" : "Add Customer"}
        </button>
      </div>

      <div className="customer-form">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          value={form.village}
          onChange={handleChange}
        />
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="🔍 Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Village</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.village}</td>

              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => editCustomer(customer)}
                >
                  ✏ Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;