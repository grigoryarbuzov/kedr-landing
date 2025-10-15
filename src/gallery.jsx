// Gallery.jsx
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Gallery({ images = [] }) {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 500,
  });

  const autoplayRef = useRef(null);
  const autoplayDelay = 6000;

  useEffect(() => {
    if (!slider) return;
    function play() {
      slider.next();
    }
    autoplayRef.current = setInterval(play, autoplayDelay);
    return () => clearInterval(autoplayRef.current);
  }, [slider]);

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <section id="gallery" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-semibold mb-6">Галерея базы "Кедр"</h2>
          <div className="rounded-lg shadow bg-gray-200 h-64 flex items-center justify-center">
            <p className="text-gray-500">Нет изображений</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-2xl font-semibold mb-6">Галерея базы "Кедр"</h2>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {images.map((src, i) => (
              <div key={i} className="keen-slider__slide flex items-center justify-center bg-gray-200">
                <img
                  src={src}
                  alt={`Фото базы Кедр ${i + 1}`}
                  className="w-full h-[520px] object-contain bg-gray-200"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
