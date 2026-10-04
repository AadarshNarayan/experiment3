import { Link } from "react-router-dom";

function Home() {
  const highlights = [
    {
      title: "International Hackathon",
      desc: "A grueling 36-hour sprint solving complex global challenges with bleeding-edge technology frameworks.",
    },
    {
      title: "RoboWars Championship",
      desc: "Watch combat engineering custom designs collision course inside the industrial arena grid framework.",
    },
    {
      title: "AI & IoT Exhibition",
      desc: "Interact directly with commercial implementations and student research prototypes built using deep hardware stacks.",
    },
  ];

  return (
    <main>
      <div
        className="hero"
        style={{
          backgroundImage: "url('/image/images.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          marginBottom: "2rem",
          color: "white",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        <h2>Welcome to TechFest 2026</h2>
      </div>

      <section>
        <h3>Highlights</h3>
        <div className="grid-container">
          {highlights.map((h, i) => (
            <article className="card" key={i}>
              <div className="card-body">
                <h4>{h.title}</h4>
                <p style={{ marginTop: 8 }}>{h.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3>Important Announcements</h3>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <strong>Submission Deadline:</strong> Extended to September 15th,
            2026.
          </li>
        </ul>
      </section>

      <section>
        <h3>Quick Links</h3>
        <p>
          <Link to="/events" style={{ color: "var(--primary)" }}>
            Browse Events →
          </Link>{" "}
          |{" "}
          <Link to="/register" style={{ color: "var(--primary)" }}>
            Register Now →
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Home;
