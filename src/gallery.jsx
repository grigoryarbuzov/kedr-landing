// Gallery.jsx
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Gallery({ images = [] }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    duration: 500,
  });

  const autoplayRef = useRef(null);
  const autoplayDelay = 6000;

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;
    const play = () => slider.next();
    autoplayRef.current = setInterval(play, autoplayDelay);
    return () => clearInterval(autoplayRef.current);
  }, [instanceRef, autoplayDelay]);

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <section id="gallery" className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Галерея базы "Кедр"</h2>
          <div className="rounded-lg shadow bg-gray-200 h-64 flex items-center justify-center">
            <p className="text-gray-500">Нет изображений</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Галерея базы "Кедр"</h2>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider relative">
            {images.map((src, i) => (
              <div
                key={i}
                className="keen-slider__slide relative flex items-center justify-center overflow-hidden rounded-lg"
              >
                {/* Размытый фон */}
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125"
                />

                {/* Лёгкая вуаль для контраста */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Главное изображение */}
                <img
                  src={src}
                  alt={`Фото базы Кедр ${i + 1}`}
                  className="relative z-10 w-auto max-w-full h-[85vh] object-contain"
                  loading="lazy"
                  decoding="async"
                /> 
              </div>
            ))}

            {/* Стрелка влево */}
            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              aria-label="Назад"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white text-6xl font-light hover:text-amber-300 transition-colors duration-150"
            >
              ‹
            </button>

            {/* Стрелка вправо */}
            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              aria-label="Вперёд"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white text-6xl font-light hover:text-amber-300 transition-colors duration-150"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
