function Contact() {
  return (
    <main>
      <section>
        <h3>Corporate Sponsors</h3>
        <div className="grid-container">
          <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
            <h4>Titan Quantum Systems</h4>
            <p style={{ color: "var(--primary)", fontWeight: "bold", marginTop: 5 }}>
              Title Sponsor
            </p>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
            <h4>Apex Cloud Services</h4>
            <p style={{ color: "#64748b", fontWeight: "bold", marginTop: 5 }}>
              Platinum Infrastructure Partner
            </p>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
            <h4>Neural Labs AI</h4>
            <p style={{ color: "#b45309", fontWeight: "bold", marginTop: 5 }}>
              Hackathon Prize Pool Sponsor
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3>Campus Location Context</h3>
        <aside
          style={{
            background: "#f8fafc",
            padding: "2rem",
            borderRadius: 6,
            borderLeft: "4px solid var(--primary)",
          }}
        >
          <h4>Central Campus Node</h4>
          <p style={{ marginTop: 5 }}>
            Engineering Block Campus Building, Floors 2-5
          </p>
          <p>
            <strong>Support Email:</strong> contact@techfest2026.edu
          </p>
          <p>
            <strong>Hotline Operations:</strong> +91 11 2345 6789 (09:00 AM -
            05:00 PM IST)
          </p>
        </aside>
      </section>
    </main>
  );
}

export default Contact;
