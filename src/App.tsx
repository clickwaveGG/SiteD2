import { useState, useEffect, useRef } from 'react';
import {
  Star,
  ShoppingBag,
  User,
  Ruler,
  Layers,
  ArrowRight,
  Shield,
  Truck,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronUp,
  MessageCircle,
  Factory,
  Hammer,
  CheckCircle2,
  Quote,
  Instagram,
  Facebook,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { HeroHighlight, Highlight } from './components/HeroHighlight';

/* ──────────────────────────────────────────────
   SMOOTH ANIMATION VARIANTS (no flicker)
   ────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

const smoothViewport = { once: true, amount: 0.15 } as const;
const smoothTransition = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as const;

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const categories = ['Todos', 'Blocos', 'Pisos Intertravados', 'Meio-Fio'];

const products = [
  /* ── BLOCOS ── */
  {
    id: 1,
    name: 'Bloco Estrutural',
    category: 'Blocos',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_160801_c4dd57b8-488d-4e34-8391-b129e4da81a9.jpeg',
    dimensions: '09x19x39 · 14x19x39 · 11,5x19x39 · 19x19x39 cm',
    application: 'Alvenaria Estrutural',
    resistance: '6 MPa',
  },
  {
    id: 2,
    name: 'Meio Bloco',
    category: 'Blocos',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_172327_987696a5-e3de-438d-b35d-ede364b62172.jpeg',
    dimensions: '09x19x19 · 14x19x19 · 19x19x19 cm',
    application: 'Ajuste e Acabamento',
    resistance: '6 MPa',
  },
  {
    id: 3,
    name: 'Bloco Calha',
    category: 'Blocos',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_180519_ea7e9653-fa50-4535-adfa-5dff2702f734.jpeg',
    dimensions: '09x19x39 · 14x19x39 · 11,5x19x39 · 19x19x39 cm',
    application: 'Cintas e Vergas',
    resistance: '6 MPa',
  },

  /* ── PISOS INTERTRAVADOS ── */
  {
    id: 5,
    name: 'Bernine',
    category: 'Pisos Intertravados',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_182009_26cb6c2c-ff56-4438-9eda-e81158ff5cee.jpeg',
    dimensions: '04x10x20 · 06x10x20 · 08x10x20 cm',
    application: 'Calçadas e Estacionamentos',
    resistance: '35 MPa',
  },
  {
    id: 4,
    name: '16 Faces',
    category: 'Pisos Intertravados',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_181114_9ee3bc67-f5f8-4234-8937-5d3a48bf923a.jpeg',
    dimensions: '06x11,5x5 · 08x11,5x22 cm',
    application: 'Calçadas e Estacionamentos',
    resistance: '35 MPa',
  },

  /* ── MEIO-FIO ── */
  {
    id: 8,
    name: 'Meio-Fio',
    category: 'Meio-Fio',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_184505_e33ab351-0147-4559-984f-fca1cb26835b.jpeg',
    dimensions: '21x12x80 cm',
    application: 'Loteamentos e Vias Públicas',
    resistance: '35 MPa',
  },
  {
    id: 9,
    name: 'Meio-Fio',
    category: 'Meio-Fio',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_184505_e33ab351-0147-4559-984f-fca1cb26835b.jpeg',
    dimensions: '15x35x80 cm',
    application: 'Loteamentos e Vias Públicas',
    resistance: '35 MPa',
  },
  {
    id: 10,
    name: 'Meio-Fio',
    category: 'Meio-Fio',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/hf_20260320_184505_e33ab351-0147-4559-984f-fca1cb26835b.jpeg',
    dimensions: '10x25x80 · 10x30x80 cm',
    application: 'Loteamentos e Vias Públicas',
    resistance: '35 MPa',
  },
];

const advantages = [
  {
    icon: Shield,
    title: 'Alta Resistência',
    description: 'Produtos que atingem as normas de resistência, garantindo durabilidade superior para qualquer tipo de tráfego.',
  },
  {
    icon: Factory,
    title: 'Fabricação Própria',
    description: 'Controle total do processo produtivo, desde a seleção de matéria-prima até o produto final.',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Logística ágil com frota própria. Entregamos em toda a região com prazo garantido.',
  },
  {
    icon: Award,
    title: 'Qualidade Certificada',
    description: 'Produtos dentro das normas ABNT, com laudos técnicos e controle de qualidade rigoroso.',
  },
  {
    icon: Hammer,
    title: 'Suporte Técnico',
    description: 'Equipe especializada para orientar na escolha do produto ideal para sua obra.',
  },
  {
    icon: Clock,
    title: 'Pronta Entrega',
    description: 'Amplo estoque disponível para atender demandas imediatas sem atrasos.',
  },
];

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Engenheiro Civil',
    company: 'Construtora Horizonte',
    text: 'A qualidade dos pavers da D2 é excepcional. Já utilizamos em 3 loteamentos e nunca tivemos problemas com trincas ou desníveis.',
    rating: 5,
  },
  {
    name: 'Ana Paula Silva',
    role: 'Arquiteta',
    company: 'Studio AP Arquitetura',
    text: 'Os blocos estruturais da D2 permitiram uma execução muito mais limpa e rápida. Recomendo para qualquer projeto residencial.',
    rating: 5,
  },
  {
    name: 'Roberto Almeida',
    role: 'Diretor de Obras',
    company: 'Pavimentação Norte',
    text: 'Parceria de longa data. Sempre entregam no prazo, com qualidade consistente. O suporte técnico faz toda a diferença.',
    rating: 5,
  },
];

const differentials = [
  { number: '50+', label: 'Tipos de produtos', icon: Layers },
  { number: '24h', label: 'Resposta de orçamento', icon: Clock },
  { number: '100%', label: 'Normas ABNT', icon: CheckCircle2 },
  { number: '0%', label: 'Taxa de rejeição', icon: Shield },
];

/* ──────────────────────────────────────────────
   CITY DATA (Two Instagram locations)
   ────────────────────────────────────────────── */

const cities = {
  juazeiro: {
    name: 'Juazeiro do Norte',
    state: 'CE',
    contact: 'Pedro Henrique',
    whatsapp: '5588981509660',
    phone: '+5588981509660',
    phoneDisplay: '(88) 9.8150-9660',
    email: 'd2blocospremoldados@gmail.com',
    address: 'Av. José Cardoso de Alcântara, 856, Cidade Kariris - Barbalha, CE',
    instagram: 'https://instagram.com/d2blocosepisosjn',
  },
  petrolina: {
    name: 'Petrolina',
    state: 'PE',
    contact: 'Rafael Pedrosa',
    whatsapp: '5587999784235',
    phone: '+5587999784235',
    phoneDisplay: '(87) 9.9978-4235',
    email: 'd2blocospremoldados@gmail.com',
    address: 'Petrolina, PE',
    instagram: 'https://instagram.com/d2blocosepisosjn',
  },
};

type CityKey = keyof typeof cities;

/* ──────────────────────────────────────────────
   COUNTER HOOK
   ────────────────────────────────────────────── */

function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || hasStarted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted && startOnView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, hasStarted, startOnView]);

  return { count, ref };
}

/* ──────────────────────────────────────────────
   APP
   ────────────────────────────────────────────── */

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [cityModalAction, setCityModalAction] = useState<'whatsapp' | 'phone' | 'general'>('general');

  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  // Open city selector modal
  const openCityModal = (action: 'whatsapp' | 'phone' | 'general' = 'general') => {
    setCityModalAction(action);
    setCityModalOpen(true);
  };

  // Handle city selection
  const handleCitySelect = (city: CityKey) => {
    const c = cities[city];
    setCityModalOpen(false);
    if (cityModalAction === 'whatsapp' || cityModalAction === 'general') {
      window.open(
        `https://wa.me/${c.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento.')}`,
        '_blank'
      );
    } else if (cityModalAction === 'phone') {
      window.location.href = `tel:${c.phone}`;
    }
  };

  // Scroll-aware navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCityModalOpen(false);
    };
    if (cityModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [cityModalOpen]);

  // Counter hooks for stats
  const stat1 = useCounter(150, 2000);
  const stat2 = useCounter(800, 2500);
  const stat3 = useCounter(200, 2000);

  return (
    <div className="bg-[#F7F7F5] text-zinc-900 font-sans selection:bg-[#8CC63F]/30 overflow-x-hidden">

      {/* ═══════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 cursor-pointer group" aria-label="D2 Blocos e Pisos - Página inicial">
            <div className="flex items-center font-black text-3xl md:text-4xl tracking-tighter">
              <span className={`transition-colors duration-300 ${scrolled ? 'text-zinc-900' : 'text-white'}`}>D</span>
              <span className="text-[#8CC63F] -ml-1.5">2</span>
            </div>
            <div className={`flex flex-col font-black text-[10px] md:text-xs leading-[1.1] tracking-wider mt-1 transition-colors duration-300 ${scrolled ? 'text-zinc-500' : 'text-white/70'}`}>
              <span>BLOCOS</span>
              <span>E PISOS</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-300 ${
            scrolled ? 'bg-zinc-100' : 'bg-black/20 backdrop-blur-md border border-white/10'
          }`}>
            {['Produtos', 'Vantagens', 'Depoimentos', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm px-5 py-2 rounded-full font-medium transition-all duration-200 hover:bg-[#8CC63F] hover:text-white ${
                  scrolled ? 'text-zinc-600' : 'text-white/90'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openCityModal('whatsapp')}
              className="hidden sm:flex items-center gap-2 bg-[#8CC63F] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#7AB033] transition-colors shadow-lg shadow-[#8CC63F]/25 cursor-pointer"
            >
              <ShoppingBag size={16} />
              <span>ORÇAMENTO</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                scrolled ? 'bg-zinc-100 text-zinc-700' : 'bg-black/20 backdrop-blur-md text-white border border-white/10'
              }`}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={smoothTransition}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-zinc-200 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {['Produtos', 'Vantagens', 'Depoimentos', 'Contato'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-zinc-700 font-medium py-3 px-4 rounded-xl hover:bg-[#8CC63F]/10 hover:text-[#8CC63F] transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={() => { setMobileMenuOpen(false); openCityModal('whatsapp'); }}
                  className="mt-2 bg-[#8CC63F] text-white py-3 px-4 rounded-xl font-bold text-center hover:bg-[#7AB033] transition-colors cursor-pointer"
                >
                  Solicitar Orçamento
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {/* Mobile video (vertical) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover block md:hidden"
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/606981e7-a7ae-4da7-8c05-98c17d69a53e.mp4"
          />
          {/* Desktop video (horizontal) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover hidden md:block"
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_39zyma8ql30s290hfBOQ8jKZC4x/dd65ff75-978c-4a37-aa96-fbc7b8a700c1.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F7F7F5] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-5 pt-32 pb-32 md:pt-40 md:pb-40">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white/90 text-xs md:text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-[#8CC63F] rounded-full animate-pulse" />
              Desde 2020 construindo qualidade
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tight mb-8"
          >
            <span className="block text-white/90 font-serif italic font-light drop-shadow-2xl">
              Resistência
            </span>
            <span className="block text-white font-black uppercase tracking-wide text-4xl sm:text-5xl md:text-7xl lg:text-8xl mt-2">
              Além Do <span className="text-[#8CC63F]">Design</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.6 }}
            className="text-white/70 text-base md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Pavers, blocos e pisos de concreto com a mais alta tecnologia.
            Soluções completas para loteamentos, obras e projetos especiais.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={() => openCityModal('whatsapp')}
              className="group bg-[#8CC63F] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#7AB033] transition-all duration-200 shadow-2xl shadow-[#8CC63F]/30 flex items-center gap-2 cursor-pointer"
            >
              Solicitar Orçamento
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#produtos"
              className="text-white/90 font-semibold text-sm tracking-wider uppercase hover:text-[#8CC63F] transition-colors border border-white/20 px-8 py-4 rounded-full hover:border-[#8CC63F]/50 cursor-pointer"
            >
              Ver Produtos
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Role para baixo</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT CATALOG
          ═══════════════════════════════════════ */}
      <section id="produtos" className="relative py-24 md:py-32 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={smoothViewport}
              transition={smoothTransition}
              className="max-w-2xl"
            >
              <span className="text-[#8CC63F] font-bold text-sm tracking-widest uppercase mb-4 block">Catálogo</span>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
                Nossos <span className="text-[#8CC63F] font-serif italic">Produtos</span>
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Linhas desenvolvidas com tecnologia de ponta para garantir
                resistência, durabilidade e acabamento impecável.
              </p>
            </motion.div>

            {/* Filter Pills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={smoothViewport}
              transition={{ ...smoothTransition, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeCategory === category
                      ? 'bg-[#8CC63F] text-white shadow-lg shadow-[#8CC63F]/20'
                      : 'bg-white text-zinc-500 hover:bg-zinc-100 border border-zinc-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Product Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={smoothTransition}
                  className="group bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${product.application}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-zinc-800 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-zinc-900 mb-4">{product.name}</h3>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-3 text-zinc-500">
                        <Ruler size={16} className="text-[#8CC63F] shrink-0" />
                        <span className="text-sm">{product.dimensions}</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-500">
                        <Layers size={16} className="text-[#8CC63F] shrink-0" />
                        <span className="text-sm">{product.application}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openCityModal('whatsapp')}
                      className="w-full flex items-center justify-center gap-2 bg-[#2D3436] text-white py-3.5 rounded-xl font-semibold hover:bg-[#8CC63F] transition-colors duration-200 group/btn cursor-pointer"
                    >
                      Solicitar Orçamento
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS SECTION
          ═══════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#E8EDE1] via-[#F0F3EB] to-[#E2E8D8] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8CC63F]/8 rounded-[100%] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={smoothViewport}
            transition={smoothTransition}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[#8CC63F] font-bold text-sm tracking-widest uppercase mb-4 block">Nossos Números</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Construindo resultados<br className="hidden md:block" /> sólidos todos os dias.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { ref: stat1.ref, count: stat1.count, suffix: '+', label: 'Cargas Enviadas', icon: Truck },
              { ref: stat2.ref, count: stat2.count, suffix: 'k+', label: 'Blocos Vendidos', icon: Layers },
              { ref: stat3.ref, count: stat3.count, suffix: '+', label: 'Obras Concluídas', icon: CheckCircle2 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={smoothViewport}
                transition={{ ...smoothTransition, delay: i * 0.1 }}
                ref={stat.ref}
                className="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/80 shadow-sm"
              >
                <div className="w-14 h-14 bg-[#8CC63F]/10 rounded-xl flex items-center justify-center mb-5">
                  <stat.icon size={28} className="text-[#8CC63F]" />
                </div>
                <span className="text-5xl md:text-7xl font-black text-[#8CC63F] tracking-tight mb-2">
                  {stat.count}{stat.suffix}
                </span>
                <span className="text-zinc-500 font-semibold text-sm tracking-wider uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VANTAGENS / SOBRE
          ═══════════════════════════════════════ */}
      <section id="vantagens" className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={smoothViewport}
            transition={smoothTransition}
            className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          >
            <span className="text-[#8CC63F] font-bold text-sm tracking-widest uppercase mb-4 block">Por que a D2?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
              Alta Resistência: <span className="text-[#8CC63F] font-serif italic">produtos que atingem as normas de resistência</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Cada produto D2 é fabricado com rigoroso controle de qualidade,
              matéria-prima selecionada e tecnologia de ponta.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={smoothViewport}
                transition={{ ...smoothTransition, delay: i * 0.08 }}
                className="group bg-[#F7F7F5] rounded-2xl p-7 md:p-8 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border border-transparent hover:border-zinc-200 cursor-default"
              >
                <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#8CC63F] transition-all duration-300">
                  <adv.icon size={24} className="text-[#8CC63F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{adv.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          POR QUE NOS ESCOLHER (Diferenciais)
          ═══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#2D3436] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8CC63F]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={smoothViewport}
            transition={smoothTransition}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-[#8CC63F] font-bold text-sm tracking-widest uppercase mb-4 block">Diferenciais</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              O que nos torna <span className="text-[#8CC63F]">diferentes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {differentials.map((diff, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={smoothViewport}
                transition={{ ...smoothTransition, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#8CC63F]/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <diff.icon size={24} className="text-[#8CC63F]" />
                </div>
                <span className="block text-3xl md:text-4xl font-black text-white mb-1">{diff.number}</span>
                <span className="text-white/50 text-xs md:text-sm font-medium tracking-wider uppercase">{diff.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DEPOIMENTOS
          ═══════════════════════════════════════ */}
      <section id="depoimentos" className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={smoothViewport}
            transition={smoothTransition}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-[#8CC63F] font-bold text-sm tracking-widest uppercase mb-4 block">Depoimentos</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              O que dizem <span className="text-[#8CC63F] font-serif italic">nossos clientes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={smoothViewport}
                transition={{ ...smoothTransition, delay: i * 0.1 }}
                className="bg-[#F7F7F5] rounded-2xl p-7 md:p-8 border border-zinc-100 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col"
              >
                {/* Quote icon */}
                <Quote size={32} className="text-[#8CC63F]/30 mb-4" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-[#8CC63F] text-[#8CC63F]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-zinc-600 leading-relaxed mb-6 flex-1 text-[15px]">
                  &ldquo;{test.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-zinc-200">
                  <div className="w-11 h-11 bg-[#8CC63F]/15 rounded-full flex items-center justify-center">
                    <User size={20} className="text-[#8CC63F]" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 text-sm">{test.name}</p>
                    <p className="text-zinc-400 text-xs">{test.role} — {test.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA / ORÇAMENTO (com HeroHighlight)
          ═══════════════════════════════════════ */}
      <section id="contato">
        <HeroHighlight containerClassName="!min-h-0 !h-auto py-24 md:py-32 !border-t-0">
          <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={smoothViewport}
              transition={smoothTransition}
            >
              <span className="text-[#8CC63F] font-bold text-sm tracking-widest uppercase mb-6 block">Fale Conosco</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                Pronto para iniciar <br className="hidden md:block" />
                <Highlight>seu projeto?</Highlight>
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Solicite um orçamento sem compromisso. Nossa equipe está pronta para
                encontrar a melhor solução para sua obra.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openCityModal('whatsapp')}
                  className="group flex items-center gap-3 bg-[#8CC63F] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#7AB033] transition-all duration-200 shadow-2xl shadow-[#8CC63F]/30 cursor-pointer"
                >
                  <MessageCircle size={20} />
                  Chamar no WhatsApp
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => openCityModal('phone')}
                  className="flex items-center gap-3 text-white/70 border border-white/20 px-8 py-4 rounded-full font-semibold hover:text-white hover:border-white/40 transition-all duration-200 cursor-pointer"
                >
                  <Phone size={18} />
                  Ligar Agora
                </button>
              </div>

              {/* Contact info — two cities */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {(Object.keys(cities) as CityKey[]).map((key) => {
                  const c = cities[key];
                  return (
                    <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="w-10 h-10 bg-[#8CC63F]/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <MapPin size={20} className="text-[#8CC63F]" />
                      </div>
                      <h4 className="text-white font-bold text-base mb-1">{c.name} — {c.state}</h4>
                      <p className="text-white/40 text-sm mb-1">{c.phoneDisplay}</p>
                      <p className="text-white/40 text-sm">{c.email}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </HeroHighlight>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="bg-[#1A1A1A] text-white/60">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {/* Logo & Desc */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center font-black text-3xl tracking-tighter">
                  <span className="text-white">D</span>
                  <span className="text-[#8CC63F] -ml-1.5">2</span>
                </div>
                <div className="flex flex-col font-black text-[10px] leading-[1.1] tracking-wider text-white/50 mt-1">
                  <span>BLOCOS</span>
                  <span>E PISOS</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/40 mb-6 max-w-xs">
                Fabricando blocos, pavers e pisos de concreto com qualidade e
                compromisso desde 2020.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram da D2 Blocos e Pisos" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#8CC63F]/20 hover:text-[#8CC63F] transition-all duration-200 cursor-pointer">
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="Facebook da D2 Blocos e Pisos" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#8CC63F]/20 hover:text-[#8CC63F] transition-all duration-200 cursor-pointer">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Navegação</h4>
              <ul className="space-y-3">
                {['Produtos', 'Vantagens', 'Depoimentos', 'Contato'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-sm hover:text-[#8CC63F] transition-colors cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Produtos</h4>
              <ul className="space-y-3">
                {['Pavers', 'Blocos Estruturais', 'Blocos de Vedação', 'Meio-Fio', 'Piso Drenante'].map((p) => (
                  <li key={p}>
                    <a href="#produtos" className="text-sm hover:text-[#8CC63F] transition-colors cursor-pointer">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contato</h4>
              <div className="space-y-5">
                {(Object.keys(cities) as CityKey[]).map((key) => {
                  const c = cities[key];
                  return (
                    <div key={key}>
                      <p className="text-[#8CC63F] text-xs font-bold uppercase tracking-wider mb-2">{c.name} — {c.state}</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-3">
                          <Phone size={14} className="text-[#8CC63F] shrink-0" />
                          <span className="text-sm">{c.phoneDisplay}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Mail size={14} className="text-[#8CC63F] shrink-0" />
                          <span className="text-sm">{c.email}</span>
                        </li>
                      </ul>
                    </div>
                  );
                })}
                <div className="flex items-center gap-3 pt-2">
                  <Clock size={14} className="text-[#8CC63F] shrink-0" />
                  <span className="text-sm">Seg-Sex: 7h às 17h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} D2 Blocos e Pisos. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/20">
              Feito com dedicação para sua obra
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════
          SCROLL TO TOP BUTTON
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#8CC63F] text-white rounded-full shadow-xl shadow-[#8CC63F]/30 flex items-center justify-center hover:bg-[#7AB033] transition-colors cursor-pointer"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          WHATSAPP FLOATING BUTTON
          ═══════════════════════════════════════ */}
      <button
        onClick={() => openCityModal('whatsapp')}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Chamar no WhatsApp"
      >
        <MessageCircle size={26} />
      </button>

      {/* ═══════════════════════════════════════
          CITY SELECTOR MODAL
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {cityModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={smoothTransition}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setCityModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl shadow-black/20 w-full max-w-md overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Selecione a unidade mais próxima"
            >
              {/* Close button */}
              <button
                onClick={() => setCityModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer z-10"
                aria-label="Fechar"
              >
                <X size={16} className="text-zinc-500" />
              </button>

              {/* Header */}
              <div className="px-8 pt-8 pb-4 text-center">
                <div className="w-14 h-14 bg-[#8CC63F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin size={28} className="text-[#8CC63F]" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-1">
                  Qual a D2 mais próxima?
                </h3>
                <p className="text-zinc-400 text-sm">
                  Selecione a unidade para ser atendido
                </p>
              </div>

              {/* City Buttons */}
              <div className="px-8 pb-8 space-y-3">
                <button
                  onClick={() => handleCitySelect('juazeiro')}
                  className="w-full group flex items-center gap-4 bg-[#F7F7F5] hover:bg-[#8CC63F] rounded-2xl p-5 transition-all duration-200 cursor-pointer border border-zinc-200 hover:border-[#8CC63F]"
                >
                  <div className="w-12 h-12 bg-white group-hover:bg-white/20 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
                    <span className="text-lg font-black text-[#8CC63F] group-hover:text-white transition-colors">JN</span>
                  </div>
                  <div className="text-left flex-1">
                    <span className="block font-bold text-zinc-900 group-hover:text-white transition-colors text-base">
                      Juazeiro do Norte
                    </span>
                    <span className="block text-zinc-400 group-hover:text-white/70 text-sm transition-colors">
                      Ceará — {cities.juazeiro.phoneDisplay}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </button>

                <button
                  onClick={() => handleCitySelect('petrolina')}
                  className="w-full group flex items-center gap-4 bg-[#F7F7F5] hover:bg-[#8CC63F] rounded-2xl p-5 transition-all duration-200 cursor-pointer border border-zinc-200 hover:border-[#8CC63F]"
                >
                  <div className="w-12 h-12 bg-white group-hover:bg-white/20 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
                    <span className="text-lg font-black text-[#8CC63F] group-hover:text-white transition-colors">PE</span>
                  </div>
                  <div className="text-left flex-1">
                    <span className="block font-bold text-zinc-900 group-hover:text-white transition-colors text-base">
                      Petrolina
                    </span>
                    <span className="block text-zinc-400 group-hover:text-white/70 text-sm transition-colors">
                      Pernambuco — {cities.petrolina.phoneDisplay}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
