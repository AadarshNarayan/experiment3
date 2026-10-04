import { useLocation, Link } from "react-router-dom";

function RegistrationSuccess() {
  const location = useLocation();
  const name = location.state?.name || "Participant";

  return (
    <main>
      <section style={{ textAlign: "center", padding: "3rem" }}>
        <h3 style={{ color: "var(--success)", borderBottom: "none" }}>
          ✅ Registration Successful!
        </h3>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
          Thank you, <strong>{name}</strong>! Your registration has been submitted
          successfully.
        </p>
        <p style={{ color: "#64748b" }}>
          You will receive a confirmation email with your digital entrance pass
          shortly.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: 15, justifyContent: "center" }}>
          <Link to="/events" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", padding: "10px 20px" }}>
            Browse Events
          </Link>
          <Link to="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", padding: "10px 20px", background: "#334155" }}>
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default RegistrationSuccess;
