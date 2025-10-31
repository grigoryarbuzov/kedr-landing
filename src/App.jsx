import React, { useEffect, useRef, useState } from "react";
import Gallery from './gallery'

/* KedrLanding - single page component with improved header
   - Meta small helper (sets title + metas)
   - Professional Header with large logo
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

function Header({ phone }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-sm' 
          : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="Логотип Кедр"
              className={`transition-all duration-300 ${
                scrolled 
                  ? 'w-12 h-12 md:w-16 md:h-16' 
                  : 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24'
              }`}
            />
            <div className={`hidden md:block transition-all duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              <div className="text-xl lg:text-2xl font-bold tracking-wide">КЕДР</div>
              <div className="text-xs lg:text-sm opacity-80">База отдыха</div>
            </div>
          </a>

          {/* Навигация - Desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a 
              href="#gallery" 
              className={`transition-colors hover:text-amber-400 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Галерея
            </a>
            <a 
              href="#prices" 
              className={`transition-colors hover:text-amber-400 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Цены
            </a>
            <a 
              href="#contacts" 
              className={`transition-colors hover:text-amber-400 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Контакты
            </a>
          </nav>

          {/* Кнопка звонка - Desktop */}
          <a
            href={`tel:${phone}`}
            className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
              scrolled
                ? 'bg-amber-400 text-black hover:bg-amber-500'
                : 'bg-white/90 text-gray-800 hover:bg-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden lg:inline">Позвонить</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            <nav className="flex flex-col gap-3">
              <a 
                href="#gallery" 
                className="px-4 py-2 rounded hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Галерея
              </a>
              <a 
                href="#prices" 
                className="px-4 py-2 rounded hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Цены
              </a>
              <a 
                href="#contacts" 
                className="px-4 py-2 rounded hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Контакты
              </a>
              <a
                href={`tel:${phone}`}
                className="mx-4 mt-2 px-6 py-3 bg-amber-400 text-black rounded-lg font-medium text-center hover:bg-amber-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                📞 Позвонить
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero({ bg, titleLines, subtitle }) {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center pt-20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Главный блок — Кедр"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      <div className="container mx-auto relative z-10 px-6 md:px-8">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight drop-shadow-2xl" style={{ fontFamily: '"Great Vibes", cursive' }}>
            {titleLines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>
          <p className="mt-8 text-xl md:text-2xl max-w-[80%] leading-relaxed drop-shadow-lg">{subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a 
              href="#contacts" 
              className="bg-amber-400 text-black px-8 py-4 rounded-lg shadow-xl hover:bg-amber-500 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Забронировать
            </a>
            <a 
              href="#gallery" 
              className="border-2 border-white/80 backdrop-blur-sm bg-white/10 px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg"
            >
              Смотреть фото
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function Contacts({ phone, address }) {
  const yandexSrc = 'https://yandex.ru/map-widget/v1/?ll=83.175555%2C54.816703&mode=whatshere&whatshere%5Bpoint%5D=83.175555%2C54.816703%5Bzoom%5D=16.52&z=16.52'

  return (
    <section id="contacts" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Контакты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">Телефон</h3>
                </div>
                <a href={`tel:${phone}`} className="block text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">{phone}</a>
                <p className="mt-2 text-sm text-gray-600">Поддержка и бронирование</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">Адрес</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{address}</p>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="sticky top-24">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Где мы находимся
              </h3>
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  title="Карта — Кедр"
                  src={yandexSrc}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">Нажмите на карту, чтобы открыть в Яндекс.Картах</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceList({ items }) {
  return (
    <section id="prices" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Прайс-лист</h2>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden bg-white rounded-xl shadow-xl border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-amber-500 to-amber-400">
                <tr>
                  <th className="text-left p-4 md:p-6 text-white font-semibold">Услуга</th>
                  <th className="text-right p-4 md:p-6 text-white font-semibold">Цена</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((it, i) => (
                  <tr key={i} className="hover:bg-amber-50 transition-colors">
                    <td className="p-4 md:p-6">
                      <div className="font-semibold text-gray-800 text-lg">{it.title}</div>
                      {it.desc && <div className="text-sm text-gray-600 mt-1">{it.desc}</div>}
                    </td>
                    <td className="p-4 md:p-6 text-right">
                      <div className="font-bold text-amber-600 text-xl">{it.price}</div>
                      {it.unit && <div className="text-sm text-gray-500 mt-1">{it.unit}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400">
            <p className="text-gray-700">
              <strong>Обратите внимание:</strong> Цены актуальны на {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })}. 
              Для уточнения деталей и бронирования позвоните нам!
            </p>
          </div>
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
  ];

  const phone = "+7‑913‑136‑30‑71";
  const address = "СНТ Вера 639/4, Новосибирский район, Новосибирская область";

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
  const heroSubtitle = "Уютная база отдыха с баней, домиками и купелью в окружении природы";

  return (
    <div className="text-gray-800">
      <Meta title={meta.title} description={meta.description} keywords={meta.keywords} />
      
      <Header phone={phone} />

      <Hero bg={heroBg} titleLines={heroText} subtitle={heroSubtitle} />

      <Gallery images={images} />

      <Contacts phone={phone} address={address} />

      <PriceList items={prices} />

      <footer className="py-8 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.svg" alt="Логотип Кедр" className="w-10 h-10" />
            <span className="text-xl font-bold text-white">КЕДР</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Кедр — база отдыха. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
