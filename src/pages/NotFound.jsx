import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main>
      <section style={{ textAlign: "center", padding: "3rem" }}>
        <h2 style={{ fontSize: "4rem", color: "var(--danger)", margin: 0 }}>
          404
        </h2>
        <h3 style={{ borderBottom: "none" }}>Page Not Found</h3>
        <p style={{ color: "#64748b", margin: "1rem 0" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary"
          style={{
            textDecoration: "none",
            display: "inline-block",
            padding: "10px 20px",
          }}
        >
          Go Back Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
