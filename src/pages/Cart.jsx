import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart, totalFee } = useContext(CartContext);

  return (
    <main>
      <section>
        <h3>Your Event Cart ({cart.length})</h3>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
              Your cart is empty.
            </p>
            <Link
              to="/events"
              className="btn-primary"
              style={{
                textDecoration: "none",
                display: "inline-block",
                padding: "10px 20px",
                marginTop: 15,
              }}
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <>
            <table className="participants-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Venue</th>
                  <th>Fee (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.venue}</td>
                    <td>₹{item.fee}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: "var(--danger)",
                          color: "white",
                          border: "none",
                          padding: "4px 10px",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total:
                  </td>
                  <td colSpan="2" style={{ fontWeight: "bold" }}>
                    ₹{totalFee}
                  </td>
                </tr>
              </tfoot>
            </table>

            <button
              onClick={clearCart}
              style={{
                marginTop: 15,
                background: "var(--danger)",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default Cart;
