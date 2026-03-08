import React, { useEffect, useState, useRef } from "react";

export default function Feedbacks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
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
  }, []);

  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prev = () => setCurrentIndex((i) => (i - 1 + feedbacks.length) % feedbacks.length);
  const next = () => setCurrentIndex((i) => (i + 1) % feedbacks.length);

  if (feedbacks.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-snow-100">
      <div ref={sectionRef} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Отзывы наших гостей
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Что говорят те, кто уже побывал у нас
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-frost-100 flex items-center justify-center" style={{ minHeight: "280px" }}>
              {feedbacks.map((fb, index) => (
                <img
                  key={fb.id}
                  src={fb.image}
                  alt={fb.alt}
                  className={`w-full h-auto object-contain transition-all duration-700 ease-in-out ${
                    index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"
                  }`}
                  loading="lazy"
                  style={{ maxHeight: "70vh" }}
                />
              ))}
            </div>

            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-frost-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all hover:scale-110 z-10" aria-label="Предыдущий">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-frost-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all hover:scale-110 z-10" aria-label="Следующий">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="flex justify-center gap-1.5 mt-5">
              {feedbacks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-frost-500 w-6" : "bg-frost-200 w-1.5 hover:bg-frost-300"
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
