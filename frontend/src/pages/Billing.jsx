import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Billing.css";

function Billing() {

  // ===========================
  // STATES
  // ===========================

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("Cash");

  const [cart, setCart] = useState([]);

  // ===========================
  // LOAD DATA
  // ===========================

  useEffect(() => {
    loadCustomers();
    loadProducts();
    loadBills();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("customers/");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("inventory/");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBills = async () => {
    try {
      const res = await api.get("billing/");
      setBills(res.data);
    } catch (err) {
      console.log(err);
    }
  };
// ===========================
// CART FUNCTIONS
// ===========================

const addToCart = () => {

  if (!product) {
    alert("Select Product");
    return;
  }

  const selected = products.find(
    (p) => p.id === Number(product)
  );

  if (!selected) return;

  const existing = cart.find(
    (item) => item.product === selected.id
  );

  if (existing) {

    const updated = cart.map((item) =>
      item.product === selected.id
        ? {
            ...item,
            quantity: item.quantity + Number(quantity),
          }
        : item
    );

    setCart(updated);

  } else {

    setCart([
      ...cart,
      {
        product: selected.id,
        name: selected.name,
        quantity: Number(quantity),
        price: Number(selected.price),
      },
    ]);

  }

  setProduct("");
  setQuantity(1);
};

const removeItem = (id) => {
  setCart(
    cart.filter(
      (item) => item.product !== id
    )
  );
};

const grandTotal = cart.reduce(
  (sum, item) => sum + (item.price * item.quantity),
  0
);

// ===========================
// GENERATE BILL
// ===========================

const generateBill = async () => {

  if (!customer) {
    alert("Please select a customer.");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  const payload = {
    customer: Number(customer),
    payment_type: payment,
    total_amount: grandTotal,
    items: cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  console.log(payload);

  try {

    await api.post("billing/", payload);

    alert("Bill Generated Successfully");

    setCustomer("");
    setProduct("");
    setQuantity(1);
    setPayment("Cash");
    setCart([]);

    loadBills();
    loadProducts();

  } catch (err) {

    console.log(err);

    if (err.response) {
      console.log(err.response.data);
      alert(JSON.stringify(err.response.data, null, 2));
    } else {
      alert("Server Error");
    }

  }

};
  // ===========================
  // PRINT BILL
  // ===========================

  const printBill = () => {
    window.print();
  };

  // ===========================
  // HELPER
  // ===========================

  const getCustomerName = (id) => {
    const c = customers.find(
      (item) => item.id === id
    );

    return c ? c.name : "";
  };

  // ===========================
  // RETURN
  // ===========================

  return (

    <div className="billing-container">

      <div className="billing-header">

        <h1>Billing</h1>

        <button
          className="generate-btn"
          onClick={generateBill}
        >
          Generate Bill
        </button>

      </div>

      <div className="billing-form">

        <select
          value={customer}
          onChange={(e) =>
            setCustomer(e.target.value)
          }
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>
          ))}

        </select>

        <select
          value={product}
          onChange={(e) =>
            setProduct(e.target.value)
          }
        >
          <option value="">
            Select Product
          </option>

          {products.map((p) => (
            <option
              key={p.id}
              value={p.id}
            >
              {p.name} (₹{p.price})
            </option>
          ))}

        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
        />

        <button
          className="generate-btn"
          onClick={addToCart}
        >
          Add Item
        </button>

      </div>

      <div className="bill-preview">

        <h2>Shopping Cart</h2>

        <table className="inventory-table">

          <thead>

            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {cart.map((item) => (

              <tr key={item.product}>

                <td>{item.name}</td>

                <td>{item.quantity}</td>

                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeItem(item.product)
                    }
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <h2
          style={{
            textAlign: "right",
            marginTop: "20px",
          }}
        >
          Grand Total : ₹{grandTotal}
        </h2>

      </div>
            <div
        style={{
          marginTop: "20px",
        }}
      >

        <label>Payment Method</label>

        <select
          style={{
            width: "100%",
            marginTop: "10px",
          }}
          value={payment}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Credit">Credit</option>
        </select>

      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >

        <button
          className="generate-btn"
          onClick={printBill}
        >
          Print Bill
        </button>

      </div>

      {/* ===========================
          BILL HISTORY
      =========================== */}

      <div className="bill-history">

        <h2>Bill History</h2>

        <table className="inventory-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {bills.length === 0 ? (

              <tr>

                <td colSpan="5">
                  No Bills Found
                </td>

              </tr>

            ) : (

              bills.map((bill) => (

                <tr key={bill.id}>

                  <td>{bill.id}</td>

                  <td>
                    {getCustomerName(bill.customer)}
                  </td>
                  

                  <td>
                    ₹{bill.total_amount}
                  </td>

                  <td>
                    {bill.payment_type}
                  </td>

                  <td>
                    {new Date(
                      bill.created_at
                    ).toLocaleDateString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Billing;