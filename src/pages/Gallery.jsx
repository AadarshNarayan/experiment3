import { useState, useEffect, useCallback } from "react";

const galleryItems = [
  { src: "/image/opening_ceremony.avif", caption: "Opening Ceremony of TechFest 2026" },
  { src: "/image/Robotics Demo.jpg", caption: "Robotics Demonstration" },
  { src: "/image/Workshop_Session.jpg", caption: "Workshop Session" },
];

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideshowRunning, setSlideshowRunning] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSlideshowRunning(false);
  };

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const showPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
  };

  // Slideshow interval using useEffect
  useEffect(() => {
    if (!slideshowRunning) return;
    const interval = setInterval(showNext, 3000);
    return () => clearInterval(interval);
  }, [slideshowRunning, showNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, showNext]);

  return (
    <main>
      <section>
        <h3>Event Gallery</h3>
        <div className="grid-container">
          {galleryItems.map((item, index) => (
            <figure
              className="card"
              key={index}
              onClick={() => openLightbox(index)}
            >
              <img src={item.src} alt={item.caption} />
              <div className="card-body">
                <p>{item.caption}</p>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <h3>Promotional Video Reel &amp; Audio Track</h3>
        <div className="media-container">
          <div>
            <h4 style={{ marginBottom: "0.5rem" }}>Teaser Trailer Reel</h4>
            <video controls poster="/image/images.jpg">
              <source src="/media/IIT.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div>
            <h4 style={{ marginBottom: "0.5rem" }}>
              Official Promotional Theme Anthem
            </h4>
            <audio controls>
              <source src="/media/IIT_audio.mp3" type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox" style={{ display: "flex" }}>
          <span className="lightbox-close" onClick={closeLightbox}>
            &times;
          </span>
          <div className="lightbox-content-wrapper">
            <button className="lightbox-btn" onClick={showPrev}>
              &#10094;
            </button>
            <div className="lightbox-image-container">
              <img
                src={galleryItems[currentIndex].src}
                alt={galleryItems[currentIndex].caption}
              />
              <p id="lightbox-caption">
                {galleryItems[currentIndex].caption}
              </p>
            </div>
            <button className="lightbox-btn" onClick={showNext}>
              &#10095;
            </button>
          </div>
          <div className="lightbox-controls">
            {!slideshowRunning ? (
              <button
                className="slideshow-btn"
                onClick={() => setSlideshowRunning(true)}
              >
                Start Slideshow
              </button>
            ) : (
              <button
                className="slideshow-btn"
                style={{ background: "var(--danger)" }}
                onClick={() => setSlideshowRunning(false)}
              >
                Stop Slideshow
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Gallery;
