import React, { useEffect, useRef, useState } from "react";
import Gallery from './gallery'
/* KedrLanding - single page component
   - Meta small helper (sets title + metas)
   - Hero with background + calligraphic font
   - Gallery carousel (arrows + touch)
   - Contacts with Yandex iframe
   - PriceList table
*/

export function Meta({ title, description, keywords }) {
  useEffect(() => {
    if (title) document.title = title;

    function setMeta(name, content) {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }

    setMeta("description", description);
    setMeta("keywords", keywords);
  }, [title, description, keywords]);

  return null;
}

function Hero({ bg, titleLines, subtitle }) {
  return (
    <section
      className="relative h-screen min-h-[520px] flex items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Главный блок — Кедр"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto relative z-10 px-6 md:px-8">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight drop-shadow-lg" style={{ fontFamily: '"Great Vibes", cursive' }}>
            {titleLines.map((l, i) => (
              <span key={i} className="select-none block">{l}</span>
            ))}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-[70%]">{subtitle}</p>
          <div className="mt-6 flex gap-3">
            <a href="#contacts" className="bg-amber-400 text-black px-4 py-2 rounded shadow">Позвонить</a>
            <a href="#gallery" className="border border-white/60 px-4 py-2 rounded">Галерея</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Gallery({ images }) {
//   const [idx, setIdx] = useState(0);
//   const len = images.length || 1;
//   const containerRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchCurrentX = useRef(0);
//
//   useEffect(() => {
//     const id = setInterval(() => setIdx((s) => (s + 1) % len), 6000);
//     return () => clearInterval(id);
//   }, [len]);
//
//   function prev() {
//     setIdx((i) => (i - 1 + len) % len);
//   }
//   function next() {
//     setIdx((i) => (i + 1) % len);
//   }
//
//   function onTouchStart(e) {
//     touchStartX.current = e.touches[0].clientX;
//   }
//   function onTouchMove(e) {
//     touchCurrentX.current = e.touches[0].clientX;
//   }
//   function onTouchEnd() {
//     const dx = touchCurrentX.current - touchStartX.current;
//     if (Math.abs(dx) < 30) return; // small swipe
//     if (dx > 0) prev();
//     else next();
//     touchStartX.current = 0;
//     touchCurrentX.current = 0;
//   }
//
//   return (
//     <section id="gallery" className="py-12 bg-gray-50">
//       <div className="container mx-auto px-6 md:px-8">
//         <h2 className="text-2xl font-semibold mb-6">Галерея базы "Кедр"</h2>
//         <div className="relative">
//           {GalleryComponent(images)}
//           <div className="flex gap-2 justify-center mt-4">
//             {images.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setIdx(i)}
//                 className={`w-3 h-3 rounded-full ${i === idx ? 'bg-amber-500' : 'bg-gray-300'}`}
//                 aria-label={`Перейти к слайду ${i + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function Contacts({ phone, address, schedule }) {
  const mapQuery = encodeURIComponent(address);
  // const yandexSrc = `https://yandex.ru/maps/?ll=54.816696,83.175528&z=12&l=map`;54.816703, 83.175555
  const yandexSrc = 'https://yandex.ru/map-widget/v1/?ll=83.175555%2C54.816703&mode=whatshere&whatshere%5Bpoint%5D=83.175555%2C54.816703%5Bzoom%5D=16.52&z=16.52'

  return (
    <section id="contacts" className="py-12">
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Контакты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Телефон</h3>
              <a href={`tel:${phone}`} className="block mt-2 text-lg text-amber-600">{phone}</a>
              <p className="mt-2 text-sm text-gray-600">Поддержка и бронирование</p>
            </div>

            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Адрес</h3>
              <p className="mt-2 text-sm text-gray-700">{address}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="font-semibold mb-3">Где мы</h3>
          <div className="w-full h-64 rounded overflow-hidden shadow">
            <iframe
              title="Карта — Кедр"
              src={yandexSrc}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Нажмите на карту, чтобы открыть в Яндекс.Картах</p>
        </div>
      </div>
    </section>
  );
}

function PriceList({ items }) {
  return (
    <section id="prices" className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-2xl font-semibold mb-6">Прайс-лист</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Услуга</th>
                <th className="text-left p-3">Цена</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 align-top">
                    <div className="font-medium">{it.title}</div>
                    {it.desc && <div className="text-sm text-gray-500">{it.desc}</div>}
                  </td>
                  <td className="p-3 align-top">
                    <div className="font-medium">{it.price}</div>
                    {it.unit && <div className="text-sm text-gray-500">{it.unit}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

export default function KedrLanding() {
  const heroBg = "/hero.png";
  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg",
    "/11.jpg",
    "/12.jpg",
    "/13.jpg",
    // "/src/assets/14.jpg",
    // "/src/assets/15.jpg",
    // "/src/assets/16.jpg",
  ];

  const phone = "+7‒913‒136‒30‒71";
  const address = "СНТ Вера 639/4, Новосибирский район, Новосибирская область";
  const schedule = {
    Понедельник: "10:00 — 21:00",
    Вторник: "10:00 — 21:00",
    Среда: "10:00 — 21:00",
    Четверг: "10:00 — 21:00",
    Пятница: "10:00 — 21:00",
    Суббота: "10:00 — 21:00",
    Воскресенье: "10:00 — 21:00",
  };

  const prices = [
    { title: "Аренда домика", desc: "Домик на 4 человека. Пятница, Суббота", price: "10000 ₽", unit: "день" },
    { title: "Аренда домика", desc: "Домик на 4 человека. Остальные дни", price: "8000 ₽", unit: "день" },
    { title: "Баня", desc: "В домике", price: "4000 ₽", unit: "дополнительная услуга" },
    { title: "Купель", desc: "Открытая купель", price: "5000 ₽", unit: "дополнительная услуга" },
  ];

  const meta = {
    title: "Кедр — база отдыха | Баня, домик, бассейн",
    description: "Кедр — уютная база отдыха с баней, домиками, бассейном и купелью. Забронируй отдых у природы!",
    keywords: "база отдыха, баня, домик, бассейн, купель, Кедр, аренда, Новосибирск, места для отдыха",
  };

  const heroText = ["Окажись на природе", "отдохни по-настоящему"];
  const heroSubtitle = "Уютная база отдыха \"Кедр\" — баня, домики, бассейн и купель. Забронируй у нас выходные!";

  return (
    <div className="text-gray-800">
      <img
        src="/logo.svg"
        alt="Логотип"
        className="fixed top-4 left-4 w-12 h-12 md:w-16 md:h-16 lg:w-40 lg:h-40 z-50"
      />
      <Meta title={meta.title} description={meta.description} keywords={meta.keywords} />

      <Hero bg={heroBg} titleLines={heroText} subtitle={heroSubtitle} />

      <Gallery images={images} />

      <Contacts phone={phone} address={address} schedule={schedule} />

      <PriceList items={prices} />

      <footer className="py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Кедр — база отдыха. Все права защищены.
      </footer>
    </div>
  );
}
