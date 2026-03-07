import React, { useEffect, useState, useRef } from "react";

export default function Feedbacks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const feedbackFiles = [
      "1.png", "2.png", "3.png", "4.png", "5.png",
      "6.png", "7.png", "8.png", "9.png", "10.png",
      "11.png", "12.png",
    ];
    setFeedbacks(
      feedbackFiles.map((file, i) => ({
        id: i + 1,
        image: `/feedbacks/${file}`,
        alt: `Отзыв ${i + 1}`,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prev = () => setCurrentIndex((i) => (i - 1 + feedbacks.length) % feedbacks.length);
  const next = () => setCurrentIndex((i) => (i + 1) % feedbacks.length);

  if (loading || feedbacks.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={sectionRef} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-forest-800 mb-4">
          Отзывы наших гостей
        </h2>
        <p className="text-center text-stone-500 max-w-lg mx-auto mb-14">
          Что говорят те, кто уже побывал у нас
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Image container */}
            <div className="relative overflow-hidden rounded-2xl bg-cream-100 border border-cream-200 shadow-sm flex items-center justify-center" style={{ minHeight: "300px" }}>
              {feedbacks.map((fb, index) => (
                <img
                  key={fb.id}
                  src={fb.image}
                  alt={fb.alt}
                  className={`w-full h-auto object-contain transition-all duration-700 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 absolute"
                  }`}
                  loading="lazy"
                  style={{ maxHeight: "75vh" }}
                />
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-forest-800 rounded-full w-11 h-11 flex items-center justify-center shadow-md transition-all hover:scale-110 z-10"
              aria-label="Предыдущий отзыв"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-forest-800 rounded-full w-11 h-11 flex items-center justify-center shadow-md transition-all hover:scale-110 z-10"
              aria-label="Следующий отзыв"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {feedbacks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-gold-500 w-6"
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
