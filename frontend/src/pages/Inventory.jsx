import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Inventory.css";

function Inventory() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("inventory/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async () => {
    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.quantity ||
      !form.price
    ) {
      alert("Please fill all fields.");
      return;
    }

    const productData = {
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      price: Number(form.price),
      description: "",
    };

    try {
      if (editingId) {
        await api.put(`inventory/${editingId}/`, productData);
        setEditingId(null);
      } else {
        await api.post("inventory/", productData);
      }

      setForm({
        name: "",
        category: "",
        quantity: "",
        price: "",
      });

      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Unable to save product.");
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`inventory/${id}/`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Unable to delete product.");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-container">

      <div className="inventory-header">
        <h1>Inventory</h1>

        <button className="add-btn" onClick={saveProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className="inventory-form">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

      </div>

      <input
        className="search-box"
        type="text"
        placeholder="🔍 Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="inventory-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.map((product) => (

            <tr key={product.id}>

              <td>{product.id}</td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td className={product.quantity < 5 ? "low-stock" : ""}>
                {product.quantity}
              </td>

              <td>₹{product.price}</td>

              <td>

                <button
                  className="action-btn edit-btn"
                  onClick={() => editProduct(product)}
                >
                  ✏ Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteProduct(product.id)}
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

export default Inventory;