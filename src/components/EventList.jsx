import EventCard from "./EventCard";

function EventList({ events }) {
  if (events.length === 0) {
    return (
      <p style={{ color: "#64748b", fontStyle: "italic" }}>
        No events match your search criteria.
      </p>
    );
  }

  return (
    <div className="grid-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
