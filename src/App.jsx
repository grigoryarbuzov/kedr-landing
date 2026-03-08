import React, { useEffect, useRef, useState, useMemo } from "react";
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

/* ===== SNOWFLAKES ===== */

function Snowflakes() {
  const flakes = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 8}s`,
      size: `${8 + Math.random() * 10}px`,
      opacity: 0.3 + Math.random() * 0.5,
    })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="snowflake"
          style={{
            left: f.left,
            animationDelay: f.delay,
            animationDuration: f.duration,
            fontSize: f.size,
            opacity: f.opacity,
          }}
        >
          *
        </div>
      ))}
    </div>
  );
}

/* ===== HEADER ===== */

function Header({ phone, scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = scrolled
    ? "text-frost-700 hover:text-frost-500"
    : "text-snow-100 hover:text-frost-300 drop-shadow-md";

  const navItems = [
    ["#features", "О нас"],
    ["#gallery", "Галерея"],
    ["#prices", "Цены"],
    ["#conditions", "Условия"],
    ["#reviews", "Отзывы"],
    ["#contacts", "Контакты"],
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-snow-50/95 shadow-lg shadow-frost-200/30 backdrop-blur-md"
          : "bg-gradient-to-b from-frost-900/50 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          <a
            href="#"
            className={`flex items-center gap-3 transition-all duration-500 ${
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <img src="/logo-winter.png" alt="Кедр" className="w-11 h-11 md:w-14 md:h-14 object-contain" />
            <div className="hidden md:block">
              <div className="text-lg font-hero font-bold text-frost-800 tracking-wider" style={{ textShadow: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white' }}>КЕДР</div>
              <div className="text-xs text-frost-500 tracking-wide" style={{ textShadow: '-0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white, 0.5px 0.5px 0 white' }}>База отдыха</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className={`transition-colors font-medium text-sm tracking-wide ${linkClass}`}>
                {label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${phone}`}
            className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all text-sm ${
              scrolled
                ? "bg-frost-500 text-white hover:bg-frost-600 shadow-sm"
                : "bg-white/90 text-frost-800 hover:bg-white shadow-lg"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Позвонить
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-frost-800" : "text-white"}`}
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

        {mobileMenuOpen && (
          <div className={`lg:hidden pb-4 ${scrolled ? "text-frost-800" : "text-white"}`}>
            <nav className="flex flex-col gap-1">
              {navItems.map(([href, label]) => (
                <a key={href} href={href} className="px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a href={`tel:${phone}`} className="mx-4 mt-2 px-6 py-3 bg-frost-500 text-white rounded-xl font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>
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
      className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden frost-grain"
      style={{ backgroundImage: "url(/hero.png)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px]">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Winter overlay — deep blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-frost-900/40 via-frost-800/50 to-frost-900/80" />

      {/* Snowflakes */}
      <Snowflakes />

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-3xl pt-16 md:pt-20">
        <div className={mounted ? "logo-reveal" : "opacity-0"}>
          <div className="relative inline-block">
            {/* Frost glow behind logo */}
            <div className="absolute inset-0 -m-8 md:-m-12 bg-frost-400/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 -m-4 md:-m-6 bg-frost-900/25 rounded-full blur-2xl" />
            <img
              src="/logo-winter.png"
              alt="Кедр — база отдыха"
              className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto drop-shadow-[0_0_40px_rgba(75,123,168,0.35)] object-contain"
            />
          </div>
        </div>

        <h1 className={`mt-6 md:mt-8 font-hero text-white leading-tight ${mounted ? "animate-fade-up-1" : "opacity-0"}`}>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-wide" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Окажись на природе,
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-wide mt-1 text-frost-200" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            отдохни по-настоящему
          </span>
        </h1>

        <p className={`mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-frost-200/90 max-w-xl mx-auto leading-relaxed font-light ${mounted ? "animate-fade-up-2" : "opacity-0"}`}>
          Уютная база отдыха с баней, домиками и купелью в&nbsp;окружении сибирской зимней природы
        </p>

        <div className={`mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4 ${mounted ? "animate-fade-up-3" : "opacity-0"}`}>
          <a href="#contacts" className="bg-frost-500 text-white px-8 py-3.5 rounded-xl shadow-xl shadow-frost-500/25 hover:bg-frost-400 transition-all hover:shadow-2xl font-semibold text-lg tracking-wide">
            Забронировать
          </a>
          <a href={`tel:${phone}`} className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all font-semibold text-lg">
            Позвонить
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-30">
        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

/* ===== FEATURES ===== */

const FEATURES = [
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg>,
    title: "Уютный домик",
    desc: "36 м², 2 комнаты, тёплые полы, полностью оборудованная кухня. Построен в 2025 году",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
    title: "Баня в домике",
    desc: "Сауна прямо в доме — из парной можно выйти на улицу. Берёзовые веники, жаркий пар",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
    title: "Купель",
    desc: "Открытая купель на свежем воздухе — бодрящий контраст после парной",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    title: "Природа и тишина",
    desc: "100 соток на краю леса, мало соседей. Грибные места, озеро, река — и всё это в 29 км от центра",
  },
];

function Features() {
  const ref = useInView();
  return (
    <section id="features" className="py-20 md:py-28 bg-snow-100 relative overflow-hidden">
      {/* Subtle diagonal pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, #1b3a5c 30px, #1b3a5c 31px)' }} />
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal relative">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Что вас ждёт
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Всё для настоящего отдыха — в окружении зимней сибирской природы
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md hover:shadow-frost-200/30 transition-all duration-300 border border-frost-100 group">
              <div className="w-12 h-12 bg-frost-50 rounded-xl flex items-center justify-center text-frost-600 mb-4 group-hover:bg-frost-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-display font-semibold text-frost-800 mb-2">{f.title}</h3>
              <p className="text-frost-500 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== GALLERY ===== */

const GALLERY_IMAGES = [
  { src: "/gallery/cabin-night.jpg", alt: "Домик вечером", span: "col-span-2 row-span-2" },
  { src: "/gallery/sunset.jpg", alt: "Закат на базе", span: "col-span-1 row-span-1" },
  { src: "/gallery/starry-night.jpg", alt: "Звёздное небо", span: "col-span-1 row-span-1" },
  { src: "/gallery/pines-winter.jpg", alt: "Сосны зимой", span: "col-span-1 row-span-2" },
  { src: "/gallery/owl.jpg", alt: "Сова на дереве", span: "col-span-1 row-span-1" },
  { src: "/gallery/snow-landscape.jpg", alt: "Зимний пейзаж", span: "col-span-1 row-span-1" },
  { src: "/gallery/snowy-pines.jpg", alt: "Заснеженные сосны", span: "col-span-1 row-span-1" },
];

function Gallery() {
  const ref = useInView();
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((p) => (p - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
      if (e.key === "ArrowRight") setLightbox((p) => (p + 1) % GALLERY_IMAGES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Галерея
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Атмосфера базы отдыха «Кедр» в&nbsp;фотографиях
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-2.5 md:gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className={`${img.span} relative rounded-xl overflow-hidden cursor-pointer group`} onClick={() => setLightbox(i)}>
              <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-frost-900/0 group-hover:bg-frost-900/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-frost-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-frost-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10" onClick={() => setLightbox(null)} aria-label="Закрыть">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }} aria-label="Назад">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <img src={GALLERY_IMAGES[lightbox].src} alt={GALLERY_IMAGES[lightbox].alt} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY_IMAGES.length); }} aria-label="Вперёд">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}

/* ===== PRICE LIST ===== */

function PriceList({ items }) {
  const ref = useInView();
  return (
    <section id="prices" className="py-20 md:py-28 bg-snow-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1b3a5c 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal relative">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Прайс-лист
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Прозрачные цены без скрытых платежей
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <div key={i} className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-frost-100 hover:border-frost-300 transition-all duration-300 group hover:shadow-md hover:shadow-frost-200/20">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-display font-semibold text-frost-800">{it.title}</h3>
                <div className="text-right ml-4 shrink-0">
                  <div className="text-2xl font-bold text-frost-600">{it.price}</div>
                  {it.unit && <div className="text-xs text-frost-400 mt-0.5">{it.unit}</div>}
                </div>
              </div>
              {it.desc && <p className="text-frost-500 text-sm">{it.desc}</p>}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-frost-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CONDITIONS ===== */

function Conditions() {
  const ref = useInView();
  const rules = [
    "Заезд с 14:00, выезд до 12:00",
    "Без животных",
    "Без курения в помещении",
    "Без шумных вечеринок",
    "Постельное бельё и полотенца включены",
    "Бесплатная парковка на территории",
    "Мангальная зона в свободном доступе",
    "Тишина после 23:00",
    "Максимум 4 гостя",
    "Залог 7 000 ₽ (возвращается при выезде)",
    "Дети — приветствуются",
  ];

  return (
    <section id="conditions" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Условия проживания
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Всё просто и понятно — отдыхайте с комфортом
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-snow-50 border border-frost-100">
                <div className="w-6 h-6 rounded-full bg-frost-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-frost-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-frost-700 text-sm">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CONTACTS + MAP ===== */

function Contacts({ phone, address }) {
  const ref = useInView();
  return (
    <section id="contacts" className="py-20 md:py-28 bg-snow-100">
      <div ref={ref} className="container mx-auto px-6 md:px-8 reveal">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-frost-800 mb-3 tracking-wide">
          Контакты
        </h2>
        <p className="text-center text-frost-500 max-w-lg mx-auto mb-14 font-light">
          Свяжитесь с нами для бронирования
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-frost-100">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-frost-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-frost-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-frost-400 mb-0.5 uppercase tracking-wider">Телефон</div>
                  <a href={`tel:${phone}`} className="text-lg font-bold text-frost-800 hover:text-frost-500 transition-colors">{phone}</a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-frost-100">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-pine-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-pine-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-frost-400 mb-0.5 uppercase tracking-wider">Адрес</div>
                  <p className="text-frost-800 font-medium">{address}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-frost-100">
              <div className="text-xs text-frost-400 mb-3 uppercase tracking-wider">Мы в соцсетях</div>
              <div className="flex gap-3">
                <a href="https://t.me/kedrbo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" /></svg>
                  </div>
                  <span className="text-sm font-medium text-frost-700">Telegram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-frost-100 min-h-[380px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D0%9D%D0%A2+%D0%92%D0%B5%D1%80%D0%B0%2C+%D0%A2%D0%B8%D1%85%D0%B0%D1%8F+%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C+17%2F2&z=14&l=map"
              width="100%" height="100%" style={{ minHeight: "380px", border: "none" }}
              allowFullScreen title="Карта — база отдыха Кедр"
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
    <footer className="py-12 bg-frost-800 text-frost-200">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo-winter.png" alt="Кедр" className="w-10 h-10 object-contain" />
            <div>
              <span className="text-lg font-hero font-bold text-white tracking-wider" style={{ textShadow: '-1px -1px 0 rgba(255,255,255,0.5), 1px -1px 0 rgba(255,255,255,0.5), -1px 1px 0 rgba(255,255,255,0.5), 1px 1px 0 rgba(255,255,255,0.5)' }}>КЕДР</span>
              <span className="text-sm text-frost-300 ml-2" style={{ textShadow: '-0.5px -0.5px 0 rgba(255,255,255,0.3), 0.5px -0.5px 0 rgba(255,255,255,0.3), -0.5px 0.5px 0 rgba(255,255,255,0.3), 0.5px 0.5px 0 rgba(255,255,255,0.3)' }}>База отдыха</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href={`tel:${phone}`} className="hover:text-frost-400 transition-colors">{phone}</a>
            <a href="https://t.me/kedrbo" target="_blank" rel="noopener noreferrer" className="hover:text-frost-400 transition-colors">Telegram</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-frost-700 text-center text-sm text-frost-400/50">
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
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const phone = "+7-913-136-30-71";
  const address = "СНТ Вера, Тихая улица, 17/2";

  const prices = [
    { title: "Аренда домика", desc: "Уютный дом на 4 человека, мангал, территория 100 соток", price: "9 000 ₽", unit: "за сутки" },
    { title: "Баня", desc: "Русская баня в домике — жаркий пар", price: "5 000 ₽", unit: "доп. услуга" },
    { title: "Купель", desc: "Открытая купель на свежем воздухе", price: "5 000 ₽", unit: "доп. услуга" },
  ];

  const meta = {
    title: "Кедр — база отдыха | Баня, домик, купель | Новосибирск",
    description: "Кедр — уютная база отдыха с баней, домиками и купелью в зимнем сибирском лесу. Забронируй отдых под Новосибирском!",
    keywords: "база отдыха, баня, домик, купель, Кедр, Новосибирск, зимний отдых, аренда домика, отдых на природе",
  };

  return (
    <div className="font-body text-frost-900">
      <Meta title={meta.title} description={meta.description} keywords={meta.keywords} />
      <Header phone={phone} scrolled={scrolled} />
      <Hero phone={phone} mounted={mounted} />
      <Features />
      <Gallery />
      <PriceList items={prices} />
      <Conditions />
      <div id="reviews">
        <Feedbacks />
      </div>
      <Contacts phone={phone} address={address} />
      <Footer phone={phone} />
    </div>
  );
}
