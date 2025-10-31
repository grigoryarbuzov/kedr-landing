// Feedbacks.jsx - Карусель отзывов
import React, { useEffect, useState } from "react";

export default function Feedbacks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка отзывов из папки feedbacks
  useEffect(() => {
    async function loadFeedbacks() {
      try {
        // Список файлов отзывов (нужно будет обновить этот список)
        const feedbackFiles = [
          '1.png', '2.png', '3.png', '4.png', '5.png',
          '6.png', '7.png', '8.png', '9.png', '10.png',
          '11.png', '12.png'
        ];
        
        const loadedFeedbacks = feedbackFiles.map((file, index) => ({
          id: index + 1,
          image: `/feedbacks/${file}`,
          alt: `Отзыв ${index + 1}`
        }));
        
        setFeedbacks(loadedFeedbacks);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
        setLoading(false);
      }
    }
    
    loadFeedbacks();
  }, []);

  // Автопрокрутка каждые 5 секунд
  useEffect(() => {
    if (feedbacks.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  if (loading) {
    return (
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Отзывы наших гостей</h2>
          <div className="flex justify-center">
            <div className="text-gray-500">Загрузка отзывов...</div>
          </div>
        </div>
      </section>
    );
  }

  if (feedbacks.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Отзывы наших гостей</h2>
        
        <div className="max-w-5xl mx-auto">
          {/* Карусель */}
          <div className="relative">
            {/* Главное изображение отзыва - АДАПТИВНОЕ */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-100 flex items-center justify-center" style={{ minHeight: '300px' }}>
              {feedbacks.map((feedback, index) => (
                <img
                  key={feedback.id}
                  src={feedback.image}
                  alt={feedback.alt}
                  className={`w-full h-auto object-contain transition-all duration-1000 ease-in-out ${
                    index === currentIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 absolute'
                  }`}
                  loading="lazy"
                  style={{ maxHeight: '80vh' }}
                />
              ))}
            </div>

            {/* Стрелка влево */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Предыдущий отзыв"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Стрелка вправо */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Следующий отзыв"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
