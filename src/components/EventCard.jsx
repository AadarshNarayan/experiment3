import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function EventCard({ event }) {
  const [seatsLeft, setSeatsLeft] = useState(event.seats);
  const { addToCart } = useContext(CartContext);

  const handleRegister = () => {
    if (seatsLeft > 0) {
      setSeatsLeft((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(event);
  };

  return (
    <article className="card event-card">
      <div className="card-body">
        <span className="category-badge">{event.category}</span>
        <h4 style={{ marginTop: 8 }}>{event.name}</h4>
        <p>{event.description}</p>
        <p className="event-meta">
          <strong>Venue:</strong> {event.venue} | <strong>Time:</strong>{" "}
          {event.time}
        </p>
        <p className="event-meta">
          <strong>Fee:</strong> ₹{event.fee} | <strong>Seats Left:</strong>{" "}
          <span className={seatsLeft === 0 ? "sold-out-text" : ""}>
            {seatsLeft}
          </span>
        </p>
        <div className="card-actions">
          <button
            className="btn-primary"
            onClick={handleRegister}
            disabled={seatsLeft === 0}
          >
            {seatsLeft === 0 ? "SOLD OUT" : "Register"}
          </button>
          <button className="btn-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
