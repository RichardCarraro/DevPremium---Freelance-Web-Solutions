/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  Code2, 
  Layers, 
  Monitor, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Smartphone, 
  Search, 
  Globe, 
  ShieldCheck,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  ChevronRight
} from "lucide-react";
// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Preços", href: "#pricing" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.08] py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-extrabold tracking-tighter flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
          DEVPRO
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-[#00FF41]/10 text-[#00FF41] px-4 py-1.5 rounded-full text-[11px] font-bold">
            <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_8px_#00FF41]" />
            Disponível para novos projetos
          </div>
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black/95 border-bottom border-white/10 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold"
            >
              Iniciar Projeto
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[420px_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-section"
        >
          <div className="card-label">Freelancer Especialista</div>
          <h1 className="text-5xl md:text-[52px] font-bold tracking-tight mb-6 leading-[1.1] text-gradient">
            Eu crio sites profissionais que geram resultado.
          </h1>
          <p className="text-base text-[#94A3B8] mb-8 leading-relaxed max-w-[360px]">
            Soluções digitais sob medida: de Landing Pages de alta conversão a sistemas complexos com performance Vercel.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="btn btn-primary px-6 py-3.5 rounded-lg text-sm font-semibold"
            >
              Solicitar Orçamento
            </a>
            <a 
              href="#portfolio" 
              className="btn btn-secondary px-6 py-3.5 rounded-lg text-sm font-semibold"
            >
              Ver Projetos
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 col-span-1 md:col-span-2 min-h-[280px] flex flex-col justify-between group overflow-hidden relative"
          >
            <img 
              src="/Captura de tela 2026-04-17 133144.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" 
              alt="CineHub Platform Preview"
            />
            <div className="relative z-10">
              <div className="card-label">Destaque</div>
              <h4 className="text-2xl font-bold mb-2">CineHub Platform</h4>
              <p className="text-sm text-[#94A3B8] max-w-sm mb-4">Catálogo moderno de filmes e séries com integração TMDB e player nativo.</p>
              <div className="flex gap-2">
                <span className="bg-white/10 px-3 py-1 rounded text-[11px] font-medium">React</span>
                <span className="bg-white/10 px-3 py-1 rounded text-[11px] font-medium">Next.js</span>
                <span className="bg-white/10 px-3 py-1 rounded text-[11px] font-medium">TMDB API</span>
              </div>
            </div>
            <div className="relative z-10 mt-auto flex justify-end">
               <ChevronRight className="w-6 h-6 text-[#6366F1]" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="card-label">Serviços</div>
            <h4 className="text-lg font-bold mb-4">O que eu entrego</h4>
            <ul className="space-y-3 text-[13px] text-[#94A3B8]">
              <li className="flex items-center gap-2 italic"><span className="text-[#6366F1] font-bold">✓</span> Landing Pages</li>
              <li className="flex items-center gap-2 italic"><span className="text-[#6366F1] font-bold">✓</span> Sistemas ERP/CRM</li>
              <li className="flex items-center gap-2 italic"><span className="text-[#6366F1] font-bold">✓</span> Apps Mobile</li>
              <li className="flex items-center gap-2 italic"><span className="text-[#6366F1] font-bold">✓</span> SEO & Performance</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="card-label">Investimento</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm font-medium">Institutional</span>
                <span className="text-sm font-bold text-[#6366F1]">R$ 2.5k+</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm font-medium">Sistemas</span>
                <span className="text-sm font-bold text-[#6366F1]">R$ 8k+</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-sm font-medium">Consultoria</span>
                <span className="text-sm font-bold text-[#6366F1]">R$ 350/h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const items = [
    {
      title: "Sites Institucionais",
      desc: "Presença digital sólida e elegante para empresas que buscam autoridade no mercado.",
      icon: <Monitor className="w-8 h-8 text-blue-400" />,
      benefit: "Autoridade Instantânea"
    },
    {
      title: "Landing Pages",
      desc: "Páginas focadas 100% em conversão, otimizadas para anúncios e geração de leads.",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      benefit: "Retorno sobre Investimento"
    },
    {
      title: "Sistemas Personalizados",
      desc: "Dashboards, CRMs e plataformas complexas para automatizar seu modelo de negócio.",
      icon: <Layers className="w-8 h-8 text-violet-400" />,
      benefit: "Eficiência Operacional"
    },
    {
      title: "Apps Mobile",
      desc: "Experiências web progressivas (PWA) e mobile que funcionam perfeitamente em qualquer tela.",
      icon: <Smartphone className="w-8 h-8 text-emerald-400" />,
      benefit: "Alcance total"
    },
    {
      title: "Soluções E-commerce",
      desc: "Lojas virtuais modernas com checkout otimizado e gestão simplificada de produtos.",
      icon: <Globe className="w-8 h-8 text-pink-400" />,
      benefit: "Vendas Escaláveis"
    },
    {
      title: "Design UX/UI Premium",
      desc: "Prototipagem de interfaces que encantam e guiam o usuário de forma intuitiva.",
      icon: <Search className="w-8 h-8 text-indigo-400" />,
      benefit: "Experiência de Elite"
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="card-label">O QUE EU FAÇO</div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Soluções digitais completas</h3>
          <p className="text-[#94A3B8] max-w-2xl leading-relaxed">
            Transformo problemas complexos em interfaces simples e sistemas poderosos. Cada linha de código é pensada no seu crescimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 glass-card"
            >
              <div className="mb-6 text-[#6366F1]">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
                {item.desc}
              </p>
              <div className="text-[11px] font-bold text-[#6366F1] flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" /> {item.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "CineHub",
      label: "Streaming Platform",
      tag: "Entertainment / TMDB API",
      description: "Um catálogo moderno de filmes, séries e animes com integração TMDB e player de vídeo.",
      img: "/Captura de tela 2026-04-17 133144.png",
      link: "https://cinehub.space"
    },
    {
      title: "Walletyx Premium",
      label: "Fintech Platform",
      tag: "Financial / SaaS Dashboard",
      description: "Uma plataforma completa e sofisticada de controle financeiro pessoal com dashboard inteligente, gestão de cartões, metas e planejamento.",
      img: "/Captura de tela 2026-04-17 133607.png",
      link: "https://walletyx.vercel.app/"
    }
  ];

  return (
    <section id="portfolio" className="py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="card-label">TRABALHOS RECENTES</div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Projetos que marcam</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              className="glass-card group overflow-hidden"
            >
              <div className="p-8 pb-0">
                <div className="card-label">{project.label}</div>
                <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-2 mb-6">
                  {project.tag.split(' / ').map((t, idx) => (
                     <span key={idx} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] uppercase font-bold text-[#94A3B8]">
                       {t}
                     </span>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="rounded-xl overflow-hidden border border-white/10 aspect-video relative group">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-primary px-6 py-2 rounded-lg text-xs font-bold"
                    >
                      Ver Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "890",
      desc: "Ideal para profissionais liberais e pequenos negócios.",
      features: ["1 a 3 páginas", "Design Responsivo", "Otimização SEO Básica", "Suporte 30 dias", "Hospedagem inclusa (1 ano)"],
      button: "Escolher Básico",
      featured: false
    },
    {
      name: "Profissional",
      price: "2.990",
      desc: "Para empresas que buscam impacto e resultados reais.",
      features: ["Site Completo (Multi-páginas)", "Design Exclusivo", "Integração Analytics", "Blog/Painel Administrativo", "Copywriting Estratégico"],
      button: "Iniciar Profissional",
      featured: true
    },
    {
      name: "Premium",
      price: "Sob Consulta",
      desc: "Sistemas complexos, plataformas e-commerce e apps.",
      features: ["Arquitetura Escalável", "Funcionalidades Avançadas", "Alta Performance (Core Web Vitals)", "Segurança Nível Bancário", "Consultoria de Escala"],
      button: "Consultar Projeto",
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="card-label">INVESTIMENTO</div>
          <h3 className="text-4xl md:text-5xl font-bold">Planos Transparentes</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              className={`p-8 glass-card border ${
                plan.featured ? "border-[#6366F1]/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]" : "border-white/[0.08]"
              }`}
            >
              <div className="card-label">{plan.name}</div>
              <div className="text-3xl font-bold text-white mb-6">
                <span className="text-[#6366F1]">R$</span> {plan.price}
              </div>
              <ul className="space-y-3 mb-10 text-[13px] text-[#94A3B8]">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-lg font-bold text-xs uppercase tracking-wider ${
                plan.featured ? "btn-primary" : "btn-secondary"
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Alinhamento", desc: "Conversamos para entender sua visão, objetivos e público-alvo." },
    { title: "Design", desc: "Criação de protótipos exclusivos seguindo sua identidade visual." },
    { title: "Desenvolvimento", desc: "Transformo o design em código performático e seguro." },
    { title: "Entrega", desc: "Lançamento oficial e treinamento para gestão do site." }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 text-center sm:text-left">
           <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 italic">COMO FUNCIONA</h2>
           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-center">Do briefing à entrega ideal</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 opacity-20" />
          {steps.map((step, i) => (
            <div key={i} className="text-center group p-4">
              <div className="relative mb-8 flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center font-bold text-xl group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all z-10">
                  0{i + 1}
                </div>
              </div>
              <h4 className="text-lg font-bold mb-3">{step.title}</h4>
              <p className="text-slate-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[420px_1fr] gap-12">
        <div>
          <div className="card-label">VAMOS CONVERSAR?</div>
          <h3 className="text-5xl font-bold mb-8 leading-tight text-gradient">Envie sua ideia e receba um orçamento.</h3>
          <p className="text-[#94A3B8] text-base mb-10 leading-relaxed">
            Especialista em transformar visões em produtos digitais de alta performance.
          </p>
          
          <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-[#94A3B8]">
                <Globe className="w-4 h-4 text-[#6366F1]" />
                <span>Curtiba para o mundo</span>
              </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Nome" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 outline-none focus:border-[#6366F1] text-sm"
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 outline-none focus:border-[#6366F1] text-sm"
              />
            </div>
            <textarea 
              rows={4} 
              placeholder="Descreva seu projeto..." 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 outline-none focus:border-[#6366F1] text-sm resize-none"
            />
            
            {status === "success" && (
              <p className="text-emerald-500 text-sm font-medium">E-mail enviado com sucesso! Responderei em breve.</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm font-medium">Erro ao enviar e-mail. Tente novamente mais tarde.</p>
            )}

            <button 
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary px-8 py-4 rounded-lg text-sm font-bold w-full uppercase tracking-widest disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Solicitar Orçamento"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs text-[#94A3B8]">
          &copy; 2026 DevPro Freelancer. Localizado em Curitiba para o mundo.
        </div>
        
        <div className="flex items-center gap-8 text-[13px] font-medium text-[#94A3B8]">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <Process />
      
      {/* Testimonials */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 italic">O QUE DIZEM</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Confiança de quem já evoluiu</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 glass-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[#6366F1]">CH</div>
                <div>
                  <div className="font-bold">Cliente privado</div>
                  <div className="text-xs text-slate-500">dono do CineHub</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "Precisávamos de uma plataforma de streaming que fosse rápida e visualmente incrível. O CineHub entregou uma experiência de cinema no navegador, com integração perfeita e um player extremamente fluido."
              </p>
            </div>

            <div className="p-8 glass-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[#6366F1]">WX</div>
                <div>
                  <div className="font-bold">Cliente privado</div>
                  <div className="text-xs text-slate-500">Dono da Walletyx</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "A gestão financeira mudou da água para o vinho. O dashboard inteligente do Walletyx é intuitivo e nos deu um controle que nunca tivemos antes. Design premium e funcionalidade impecável."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}

