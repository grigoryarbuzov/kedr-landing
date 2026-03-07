import React, { useEffect, useRef, useState } from "react";
import Feedbacks from "./Feedbacks";

/* ===== HOOKS ===== */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ===== META ===== */

function Meta({ title, description, keywords }) {
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

/* ===== PINE CONE SVG ===== */

function PineCone({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* stem */}
      <rect x="28" y="2" width="8" height="12" rx="3" fill="#8B7355" />
      {/* scales — overlapping rounded shapes */}
      <ellipse cx="32" cy="22" rx="8" ry="7" fill="#6B4226" />
      <ellipse cx="24" cy="32" rx="9" ry="7" fill="#5C3A1E" />
      <ellipse cx="40" cy="32" rx="9" ry="7" fill="#5C3A1E" />
      <ellipse cx="32" cy="36" rx="10" ry="8" fill="#7A4B2A" />
      <ellipse cx="22" cy="46" rx="10" ry="8" fill="#5C3A1E" />
      <ellipse cx="42" cy="46" rx="10" ry="8" fill="#5C3A1E" />
      <ellipse cx="32" cy="50" rx="12" ry="9" fill="#6B4226" />
      <ellipse cx="24" cy="60" rx="10" ry="8" fill="#7A4B2A" />
      <ellipse cx="40" cy="60" rx="10" ry="8" fill="#7A4B2A" />
      <ellipse cx="32" cy="64" rx="11" ry="8" fill="#5C3A1E" />
      <ellipse cx="32" cy="76" rx="8" ry="7" fill="#6B4226" />
      <ellipse cx="32" cy="84" rx="5" ry="4" fill="#7A4B2A" />
    </svg>
  );
}

/* ===== HEADER ===== */

function Header({ phone, scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = scrolled
    ? "text-stone-700 hover:text-gold-500"
    : "text-cream-100 hover:text-gold-300 drop-shadow-md";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/95 shadow-lg backdrop-blur-sm"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo in header — appears on scroll */}
          <a
            href="#"
            className={`flex items-center gap-3 transition-all duration-500 ${
              scrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <img src="/logo.svg" alt="Кедр" className="w-11 h-11 md:w-14 md:h-14" />
            <div className="hidden md:block">
              <div className="text-lg font-serif font-bold text-forest-800 tracking-wide">
                КЕДР
              </div>
              <div className="text-xs text-stone-500">База отдыха</div>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              ["#features", "О нас"],
              ["#prices", "Цены"],
              ["#reviews", "Отзывы"],
              ["#contacts", "Контакты"],
            ].map(([href, label]) => (
              <a key={href} href={href} className={`transition-colors font-medium ${linkClass}`}>
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={`tel:${phone}`}
            className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              scrolled
                ? "bg-gold-400 text-forest-900 hover:bg-gold-300 shadow-sm"
                : "bg-cream-50/90 text-forest-800 hover:bg-white shadow-lg"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Позвонить
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-stone-800" : "text-white"
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
          <div className={`md:hidden pb-4 ${scrolled ? "text-stone-800" : "text-white"}`}>
            <nav className="flex flex-col gap-2">
              {[
                ["#features", "О нас"],
                ["#prices", "Цены"],
                ["#reviews", "Отзывы"],
                ["#contacts", "Контакты"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href={`tel:${phone}`}
                className="mx-4 mt-2 px-6 py-3 bg-gold-400 text-forest-900 rounded-lg font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Позвонить
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ===== HERO ===== */

function Hero({ phone, mounted }) {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden grain"
      style={{
        backgroundImage: "url(/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Video background — falls back to hero.png if missing */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/fire.mp4" type="video/mp4" />
        <source src="/fire.webm" type="video/webm" />
      </video>

      {/* Dark atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-forest-900/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Logo */}
        <div className={mounted ? "logo-reveal" : "opacity-0"}>
          <img
            src="/logo.svg"
            alt="Кедр — база отдыха"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Text */}
        <h1
          className={`mt-6 md:mt-8 font-serif text-cream-100 leading-tight ${
            mounted ? "animate-fade-up-delay-1" : "opacity-0"
          }`}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            Окажись на природе,
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            отдохни по-настоящему
          </span>
        </h1>

        <p
          className={`mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-cream-200 max-w-xl mx-auto leading-relaxed ${
            mounted ? "animate-fade-up-delay-2" : "opacity-0"
          }`}
        >
          Уютная база отдыха с баней, домиками и купелью в&nbsp;окружении сибирской природы
        </p>

        {/* CTA */}
        <div
          className={`mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4 ${
            mounted ? "animate-fade-up-delay-3" : "opacity-0"
          }`}
        >
          <a
            href="#contacts"
            className="bg-gold-400 text-forest-900 px-8 py-3.5 rounded-lg shadow-xl hover:bg-gold-300 transition-all hover:shadow-2xl font-semibold text-lg"
          >
            Забронировать
          </a>
          <a
            href={`tel:${phone}`}
            className="border-2 border-cream-100/60 bg-white/10 backdrop-blur-sm text-cream-100 px-8 py-3.5 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg"
          >
            Позвонить
          </a>
        </div>
      </div>

      {/* Pine cone rolling in from the right */}
      {mounted && (
        <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-16 md:right-24 animate-pine-roll pointer-events-none">
          <PineCone className="w-12 h-16 sm:w-14 sm:h-20 md:w-16 md:h-22 drop-shadow-lg" />
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-cream-200/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

/* ===== FEATURES ===== */

const FEATURES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </svg>
    ),
    title: "Уютные домики",
    desc: "Тёплые домики на 4 человека со всеми удобствами для комфортного отдыха",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    title: "Русская баня",
    desc: "Настоящая русская баня в каждом домике — жаркий пар и берёзовые веники",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: "Купель",
    desc: "Открытая купель на свежем воздухе — контраст после бани для бодрости духа",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Природа",
    desc: "Тишина и красота сибирской природы — кедры, свежий воздух и звёздное небо",
  },
];

function Features() {
  const ref = useInView();
  return (
    <section id="features" className="py-20 md:py-28 bg-cream-100">
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-forest-800 mb-4">
          Что вас ждёт
        </h2>
        <p className="text-center text-stone-500 max-w-lg mx-auto mb-14">
          Всё для настоящего отдыха на природе — без суеты и забот
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-cream-200"
            >
              <div className="w-14 h-14 bg-forest-50 rounded-xl flex items-center justify-center text-forest-600 mb-5">
                {f.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold text-forest-800 mb-2">{f.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== PRICE LIST ===== */

function PriceList({ items }) {
  const ref = useInView();
  return (
    <section id="prices" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-forest-800 mb-4">
          Прайс-лист
        </h2>
        <p className="text-center text-stone-500 max-w-lg mx-auto mb-14">
          Прозрачные цены без скрытых платежей
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              className="relative bg-cream-50 rounded-2xl p-7 border border-cream-200 hover:border-gold-300 transition-colors duration-300 group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-serif font-semibold text-forest-800">{it.title}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold-600">{it.price}</div>
                  {it.unit && (
                    <div className="text-xs text-stone-400 mt-0.5">{it.unit}</div>
                  )}
                </div>
              </div>
              {it.desc && <p className="text-stone-500 text-sm">{it.desc}</p>}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CONTACTS + MAP ===== */

function Contacts({ phone, address }) {
  const ref = useInView();
  return (
    <section id="contacts" className="py-20 md:py-28 bg-cream-100">
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-forest-800 mb-4">
          Контакты
        </h2>
        <p className="text-center text-stone-500 max-w-lg mx-auto mb-14">
          Свяжитесь с нами для бронирования
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact cards */}
          <div className="space-y-5">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-stone-400 mb-1">Телефон</div>
                  <a href={`tel:${phone}`} className="text-xl font-bold text-forest-800 hover:text-gold-600 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-stone-400 mb-1">Адрес</div>
                  <p className="text-forest-800 font-medium">{address}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
              <div className="text-sm text-stone-400 mb-4">Мы в соцсетях</div>
              <div className="space-y-3">
                <a
                  href="https://t.me/kedrbo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-stone-800">Telegram</div>
                    <div className="text-sm text-stone-400">t.me/kedrbo</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/kedr.novosibirsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-stone-800">Instagram</div>
                    <div className="text-sm text-stone-400">kedr.novosibirsk</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Yandex Map */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-200 min-h-[400px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D0%9D%D0%A2+%D0%92%D0%B5%D1%80%D0%B0%2C+%D0%A2%D0%B8%D1%85%D0%B0%D1%8F+%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C+17%2F2&z=14&l=map"
              width="100%"
              height="100%"
              style={{ minHeight: "400px", border: "none" }}
              allowFullScreen
              title="Карта — база отдыха Кедр"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */

function Footer({ phone }) {
  return (
    <footer className="py-12 bg-forest-800 text-cream-200">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Кедр" className="w-10 h-10" />
            <div>
              <span className="text-lg font-serif font-bold text-cream-100">КЕДР</span>
              <span className="text-sm text-cream-300 ml-2">База отдыха</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href={`tel:${phone}`} className="hover:text-gold-400 transition-colors">{phone}</a>
            <a href="https://t.me/kedrbo" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
              Telegram
            </a>
            <a href="https://instagram.com/kedr.novosibirsk" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-forest-700 text-center text-sm text-cream-300/60">
          &copy; {new Date().getFullYear()} Кедр — база отдыха. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/* ===== MAIN ===== */

export default function KedrLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const phone = "+7-913-136-30-71";
  const address = "СНТ Вера, Тихая улица, 17/2";

  const prices = [
    { title: "Аренда домика", desc: "Домик на 4 человека. Пятница, Суббота", price: "10 000 \u20BD", unit: "за день" },
    { title: "Аренда домика", desc: "Домик на 4 человека. Остальные дни", price: "8 000 \u20BD", unit: "за день" },
    { title: "Баня", desc: "В домике", price: "4 000 \u20BD", unit: "доп. услуга" },
    { title: "Купель", desc: "Открытая купель", price: "5 000 \u20BD", unit: "доп. услуга" },
  ];

  const meta = {
    title: "Кедр — база отдыха | Баня, домик, купель | Новосибирск",
    description: "Кедр — уютная база отдыха с баней, домиками и купелью. Забронируй отдых на природе под Новосибирском!",
    keywords: "база отдыха, баня, домик, купель, Кедр, Новосибирск, отдых на природе, аренда домика",
  };

  return (
    <div className="font-sans text-stone-800">
      <Meta title={meta.title} description={meta.description} keywords={meta.keywords} />
      <Header phone={phone} scrolled={scrolled} />
      <Hero phone={phone} mounted={mounted} />
      <Features />
      <PriceList items={prices} />
      <div id="reviews">
        <Feedbacks />
      </div>
      <Contacts phone={phone} address={address} />
      <Footer phone={phone} />
    </div>
  );
}
