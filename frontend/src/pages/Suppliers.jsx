import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Suppliers.css";

function Suppliers() {

  // ===========================
  // STATES
  // ===========================

  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    address: "",
    gst_number: "",
  });

  // ===========================
  // LOAD SUPPLIERS
  // ===========================

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {

      const res = await api.get("suppliers/");

      setSuppliers(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ===========================
  // INPUT CHANGE
  // ===========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // ===========================
  // ADD / UPDATE SUPPLIER
  // ===========================

  const saveSupplier = async () => {

    if (
      !form.name ||
      !form.phone ||
      !form.company
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {

      if (editingId) {

        await api.put(
          `suppliers/${editingId}/`,
          form
        );

        alert("Supplier Updated Successfully");

      } else {

        await api.post(
          "suppliers/",
          form
        );

        alert("Supplier Added Successfully");

      }

      setForm({
        name: "",
        phone: "",
        company: "",
        email: "",
        address: "",
        gst_number: "",
      });

      setEditingId(null);

      loadSuppliers();

    } catch (err) {

      console.log(err);

      alert("Error Saving Supplier");

    }

  };

  // ===========================
  // RETURN START
  // ===========================

  return (

    <div className="suppliers-container">

      <h1>Supplier Management</h1>

      <div className="supplier-form">

        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
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
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gst_number"
          placeholder="GST Number"
          value={form.gst_number}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button
          className="save-btn"
          onClick={saveSupplier}
        >
          {editingId
            ? "Update Supplier"
            : "Add Supplier"}
        </button>

      </div>
            {/* ===========================
          SEARCH
      =========================== */}

      <input
        className="search-box"
        type="text"
        placeholder="Search Supplier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ===========================
          SUPPLIERS TABLE
      =========================== */}

      <table className="supplier-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Email</th>
            <th>GST</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

        </thead>

        <tbody>

          {suppliers
            .filter((supplier) =>
              supplier.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((supplier) => (

              <tr key={supplier.id}>

                <td>{supplier.id}</td>

                <td>{supplier.name}</td>

                <td>{supplier.phone}</td>

                <td>{supplier.company}</td>

                <td>{supplier.email}</td>

                <td>{supplier.gst_number}</td>

                <td>{supplier.address}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => {

                      setEditingId(supplier.id);

                      setForm({
                        name: supplier.name,
                        phone: supplier.phone,
                        company: supplier.company,
                        email: supplier.email,
                        address: supplier.address,
                        gst_number: supplier.gst_number,
                      });

                    }}
                  >
                    Edit
                  </button>

                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={async () => {

                      if (
                        !window.confirm(
                          "Delete this supplier?"
                        )
                      )
                        return;

                      try {

                        await api.delete(
                          `suppliers/${supplier.id}/`
                        );

                        loadSuppliers();

                      } catch (err) {

                        console.log(err);

                        alert("Unable to delete supplier.");

                      }

                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  );

}

export default Suppliers;