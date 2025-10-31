import React, { useEffect, useRef, useState } from "react";
import Gallery from './gallery'
import Feedbacks from './Feedbacks'

/* KedrLanding - АНИМИРОВАННЫЙ ГИГАНТСКИЙ ЛОГОТИП
   - Логотип выезжает справа на белой подложке
   - При скролле уезжает обратно вправо
   - Появляется в header
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

function Header({ phone, scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-sm' 
          : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Логотип появляется при скролле */}
          <a 
            href="#" 
            className={`flex items-center gap-3 group relative transition-all duration-500 ${
              scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <img
              src="/logo.svg"
              alt="Логотип Кедр"
              className="w-12 h-12 md:w-16 md:h-16 transition-all duration-300"
            />
            <div className="hidden md:block text-gray-800">
              <div className="text-xl font-bold tracking-wide">КЕДР</div>
              <div className="text-xs opacity-80">База отдыха</div>
            </div>
          </a>

          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a 
              href="#gallery" 
              className={`transition-colors hover:text-amber-400 ${
                scrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
              }`}
            >
              Галерея
            </a>
            <a 
              href="#prices" 
              className={`transition-colors hover:text-amber-400 ${
                scrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
              }`}
            >
              Цены
            </a>
            <a 
              href="#contacts" 
              className={`transition-colors hover:text-amber-400 ${
                scrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
              }`}
            >
              Контакты
            </a>
          </nav>

          {/* Кнопка звонка */}
          <a
            href={`tel:${phone}`}
            className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
              scrolled
                ? 'bg-amber-400 text-black hover:bg-amber-500'
                : 'bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm shadow-lg'
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
              scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10 backdrop-blur-sm'
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

function Hero({ bg, titleLines, subtitle, scrolled, mounted }) {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Главный блок — Кедр"
    >
      {/* Темная вуаль на фоне */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      
      {/* МОБИЛЬНАЯ ВЕРСИЯ: Логотип по центру на весь экран с градиентом с двух сторон */}
      <div 
        className={`lg:hidden absolute left-1/2 -translate-x-1/2 transition-all ease-out w-full ${
          scrolled 
            ? 'opacity-0 scale-75 duration-[2000ms] top-[-20%]' 
            : mounted
              ? 'opacity-100 scale-100 duration-1000 top-[35%] -translate-y-1/2'
              : 'opacity-0 scale-90 duration-0 top-[20%]'
        }`}
      >
        {/* Градиент с ДВУХ сторон для мобильной версии */}
        <div className="absolute inset-0 -m-8 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        
        <div className="relative flex justify-center">
          <img
            src="/logo.svg"
            alt="Логотип Кедр"
            className="w-80 h-80 sm:w-96 sm:h-96 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* ДЕСКТОПНАЯ ВЕРСИЯ: Логотип справа с градиентом слева */}
      <div 
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 transition-all ease-out ${
          scrolled 
            ? 'right-[-100%] opacity-0 scale-75 duration-[2000ms]' 
            : mounted
              ? 'right-8 md:right-16 lg:right-20 xl:right-24 opacity-100 scale-100 duration-1000'
              : 'right-[-100%] opacity-0 scale-90 duration-0'
        }`}
      >
        {/* Белая градиентная подложка слева (десктоп) */}
        <div className="absolute inset-0 -m-16 md:-m-20 lg:-m-24 xl:-m-28 bg-gradient-to-l from-white/85 via-white/60 to-transparent rounded-3xl shadow-2xl" />
        
        <div className="relative">
          <img
            src="/logo.svg"
            alt="Логотип Кедр"
            className="w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Контент */}
      <div className="container mx-auto relative z-10 px-6 md:px-8 lg:px-12">
        {/* МОБИЛЬНАЯ ВЕРСИЯ: Текст внизу, уезжает ВНИЗ при появлении логотипа */}
        <div 
          className={`lg:hidden absolute left-6 right-6 text-white transition-all duration-1000 ease-out ${
            mounted 
              ? 'bottom-16 opacity-100' 
              : 'bottom-1/2 translate-y-1/2 opacity-0'
          } ${
            scrolled ? 'opacity-0 translate-y-10' : ''
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-serif leading-tight drop-shadow-2xl" style={{ fontFamily: '"Great Vibes", cursive' }}>
            {titleLines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed drop-shadow-lg">{subtitle}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a 
              href="#contacts" 
              className="bg-amber-400 text-black px-6 py-3 rounded-lg shadow-xl hover:bg-amber-500 transition-all text-center font-semibold"
            >
              Забронировать
            </a>
            <a 
              href="#gallery" 
              className="border-2 border-white/80 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-lg hover:bg-white/20 transition-all text-center font-semibold"
            >
              Смотреть фото
            </a>
          </div>
        </div>

        {/* ДЕСКТОПНАЯ ВЕРСИЯ: Текст слева */}
        <div className="hidden lg:block max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-tight drop-shadow-2xl" style={{ fontFamily: '"Great Vibes", cursive' }}>
            {titleLines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl max-w-[85%] leading-relaxed drop-shadow-lg">{subtitle}</p>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
            <a 
              href="#contacts" 
              className="bg-amber-400 text-black px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-xl hover:bg-amber-500 transition-all transform hover:scale-105 font-semibold text-base md:text-lg"
            >
              Забронировать
            </a>
            <a 
              href="#gallery" 
              className="border-2 border-white/80 backdrop-blur-sm bg-white/10 px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-base md:text-lg"
            >
              Смотреть фото
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
        scrolled ? 'opacity-0' : 'opacity-100 animate-bounce'
      }`}>
        <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function Contacts({ phone, address }) {
  return (
    <section id="contacts" className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Контакты</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Телефон */}
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

            {/* Адрес */}
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

            {/* Соцсети */}
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Наши соцсети</h3>
              </div>
              <div className="space-y-3">
                <a 
                  href="https://t.me/kedrbo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Telegram</div>
                    <div className="text-sm text-gray-600">t.me/kedrbo</div>
                  </div>
                </a>
                
                <a 
                  href="https://instagram.com/kedr.novosibirsk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Instagram</div>
                    <div className="text-sm text-gray-600">kedr.novosibirsk</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceList({ items }) {
  return (
    <section id="prices" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Прайс-лист</h2>

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
        </div>
      </div>
    </section>
  );
}

export default function KedrLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Запуск анимации въезда логотипа
    const timer = setTimeout(() => setMounted(true), 100);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  const address = "СНТ Вера, Тихая улица, 17/2";

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
      
      <Header phone={phone} scrolled={scrolled} />

      <Hero bg={heroBg} titleLines={heroText} subtitle={heroSubtitle} scrolled={scrolled} mounted={mounted} />

      <Gallery images={images} />

      <Contacts phone={phone} address={address} />

      <Feedbacks />

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
