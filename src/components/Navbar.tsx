import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

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
        <a href="#home" className="text-xl font-extrabold tracking-tighter flex items-center gap-2" aria-label="Go to home">
          <div className="w-2 h-2 rounded-full bg-[#6366F1]" aria-hidden="true" />
          DEVPRO
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366F1] rounded"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-[#00FF41]/10 text-[#00FF41] px-4 py-1.5 rounded-full text-[11px] font-bold" aria-label="Available for new projects">
            <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_8px_#00FF41]" aria-hidden="true" />
            Disponível para novos projetos
          </div>
          <button 
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#6366F1] rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
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
                className="text-lg font-medium text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6366F1] rounded"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Iniciar Projeto
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
