import React, { useEffect, useRef, useState } from "react";

const REVIEWS = [
  { name: "Анастасия Игоревна", date: "4 марта", text: "Все было отлично, купель, банька, уютный милый домик. Спасибо за чудесный отдых!" },
  { name: "Наталья", date: "20 февраля", text: "Место просто супер! Недалечко от города, большая территория, на окраине, вокруг лес, тишина. Домик очень уютный и теплый за счет подогрева пола. Из дома вход в баню, из бани можно выйти на улицу. Все продумано до мелочей. Купель — это просто моя любовь!" },
  { name: "Владислав", date: "20 февраля", text: "Прекрасный отдых. Домик, баня, мангал, тишина, много птиц и большая сова, которая охраняет ваше спокойствие." },
  { name: "Артём", date: "14 февраля", text: "Всё отлично, чисто, красиво, уютно. Баня горячая, чан для −25 градусов подошел отлично." },
  { name: "Анна", date: "3 января", text: "Замечательное место для отдыха и перезагрузки организма! Спокойствие, тишина, банька, купель — лучшее времяпрепровождение! В домике есть всё, что нужно. Все продумано!" },
  { name: "Юлия", date: "1 января", text: "Провели и встретили Новый год с семьей. Дом очень уютный, чистый, всё по-домашнему. Теплые полы — просто потрясающий сюрприз. Посуда очень красивая. Банька, купель — всё супер!" },
  { name: "Анна", date: "28 декабря", text: "Все идеально: большая территория, лес, простор, тишина, уютный дом. Все сделано со вкусом, вниманием к деталям и очень красиво. Баня отличная — парились несколько часов!" },
  { name: "Даниил", date: "23 декабря", text: "Чудесное место, владельцы прекрасные люди. Все удобства!" },
  { name: "Ирина", date: "21 декабря", text: "Хорошее место, отдыхали семьей. Чан, сауна в домике — очень удобно. Чисто, уютно. Хозяева просто замечательные люди, добрые, отзывчивые! Советуем!" },
  { name: "Алина", date: "11 декабря", text: "Отличный домик, современный дизайн. В доме тепло, были в мороз." },
  { name: "Ирина", date: "11 декабря", text: "Всё понравилось, хозяева душевные. Уединение с природой, чистый воздух." },
  { name: "Гость", date: "декабрь", text: "Очень понравился домик. Уютно и комфортно, а купель с баней — вообще восторг. В доме чисто, все нужные принадлежности есть. Хозяева добрые и понимающие." },
  { name: "Гость", date: "декабрь", text: "Спасибо Татьяне и её супругу за гостеприимство, уютный домик, нам всё очень понравилось. Дом оснащен всем необходимым, баня и купель — супер!" },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-2">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Feedbacks() {
  const sectionRef = useRef(null);
  const [page, setPage] = useState(0);
  const perPage = typeof window !== "undefined" && window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(REVIEWS.length / perPage);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-20 md:py-28 bg-snow-100">
      <div ref={sectionRef} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Отзывы наших гостей
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Что говорят те, кто уже побывал у нас
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[220px]">
            {visible.map((r, i) => (
              <div
                key={`${page}-${i}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-frost-100 shadow-sm hover:shadow-md hover:shadow-frost-200/30 transition-all duration-500 animate-fade-up flex flex-col"
              >
                <StarRating />
                <p className="text-frost-600 text-sm leading-relaxed flex-1 mb-4">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-3 border-t border-frost-100">
                  <div className="w-9 h-9 rounded-full bg-frost-100 flex items-center justify-center text-frost-600 font-display font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-frost-800">{r.name}</div>
                    <div className="text-xs text-frost-400">{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page ? "bg-frost-500 w-6" : "bg-frost-200 w-1.5 hover:bg-frost-300"
                }`}
                aria-label={`Страница ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
