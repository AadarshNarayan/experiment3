import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import eventsData from "../data/events";
import EventList from "../components/EventList";

function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // --- API-fetched events ---
  const [apiEvents, setApiEvents] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setApiLoading(true);
    setApiError(null);
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=4")
      .then((res) => {
        const mapped = res.data.map((post) => ({
          id: post.id + 100,
          name: post.title.slice(0, 40),
          category: "Workshop",
          description: post.body.slice(0, 100),
          venue: "Online",
          time: "TBA",
          fee: 0,
          seats: 20,
        }));
        setApiEvents(mapped);
        setApiLoading(false);
      })
      .catch((err) => {
        setApiError("Failed to fetch events from API: " + err.message);
        setApiLoading(false);
      });
  }, []);

  // Combine local + API events
  const allEvents = [...eventsData, ...apiEvents];

  // Derive unique categories
  const categories = [
    "All",
    ...new Set(allEvents.map((e) => e.category)),
  ];

  // Filter events
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      {/* Search & Filter */}
      <section>
        <h3>Upcoming Events</h3>
        <div style={{ display: "flex", gap: 15, flexWrap: "wrap", marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search events by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: 250,
              padding: "10px 14px",
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: "1rem",
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ccc" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <EventList events={filteredEvents} />
      </section>

      {/* API Loading / Error states */}
      <section>
        <h3>Events from API</h3>
        {apiLoading && (
          <p style={{ color: "#64748b" }}>
            ⏳ Loading events from external API...
          </p>
        )}
        {apiError && (
          <p className="error">❌ {apiError}</p>
        )}
        {!apiLoading && !apiError && (
          <p className="success">
            ✅ Successfully loaded {apiEvents.length} events from JSONPlaceholder API.
          </p>
        )}
      </section>

      {/* Registration Flow */}
      <section>
        <h3>Registration Step-by-Step Flow</h3>
        <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>
            Navigate to our integrated{" "}
            <Link to="/register" style={{ color: "var(--primary)" }}>
              application form page
            </Link>
            .
          </li>
          <li>Pick your primary technical events using structural validations.</li>
          <li>Complete verification codes and receive your digital entrance pass.</li>
        </ol>
      </section>

      {/* Event Schedule Table */}
      <section>
        <h3>Event Schedule</h3>
        <div style={{ overflowX: "auto" }}>
          <table className="participants-table">
            <caption style={{ padding: 8, fontWeight: 600, textAlign: "left" }}>
              Official TechFest Timeline Execution Matrix
            </caption>
            <thead>
              <tr>
                <th>Day / Period</th>
                <th>09:30 AM - 12:30 PM</th>
                <th>12:30 PM - 01:30 PM</th>
                <th>01:30 PM - 04:30 PM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Day 1</strong></td>
                <td>Keynote &amp; Opening Keynote</td>
                <td
                  rowSpan="2"
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    background: "#e2e8f0",
                    fontWeight: "bold",
                  }}
                >
                  LUNCH BREAK
                </td>
                <td>CodeSprint Prelims</td>
              </tr>
              <tr>
                <td><strong>Day 2</strong></td>
                <td>RoboWars Round 1</td>
                <td>UI/UX Evaluation</td>
              </tr>
              <tr>
                <td><strong>Day 3</strong></td>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    background: "#f1f5f9",
                  }}
                >
                  Grand Finale Pitch Decks &amp; Awards Distribution
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="4"
                  style={{ fontSize: "0.85rem", color: "#475569" }}
                >
                  Note: Participants must report to assigned labs 15 minutes
                  prior to designated matrix hours.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Committee Contacts */}
      <section>
        <h3>Organizing Committee Contacts</h3>
        <dl style={{ lineHeight: 1.6 }}>
          <dt style={{ fontWeight: "bold", marginTop: 10 }}>
            Prof. Vivek Hemand
          </dt>
          <dd style={{ marginLeft: 15, color: "#475569" }}>
            General Convenor - Overarching Fest Execution Operations
          </dd>
          <dt style={{ fontWeight: "bold", marginTop: 10 }}>Prof. Amal</dt>
          <dd style={{ marginLeft: 15, color: "#475569" }}>
            Technical Program Chair - Judging Panels &amp; Lab Configuration
            Control
          </dd>
        </dl>
      </section>
    </main>
  );
}

export default Events;
