"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Navigation, Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Serviços", href: "#servicos" },
  { name: "Segurança & LGPD", href: "#seguranca" },
  { name: "Cases Reais", href: "#portfolio" },
  { name: "Calculadora ROI", href: "#calculadora" },
  { name: "Contato", href: "#contato" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3.5rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    }
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest; 
    } 
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    
    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.08 } : {}}
          whileTap={!isExpanded ? { scale: 0.95 } : {}}
          onClick={handleNavClick}
          className={cn(
            "flex items-center overflow-hidden rounded-full border border-stone-300 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/90 shadow-xl backdrop-blur-md h-13 px-2",
            !isExpanded && "cursor-pointer justify-center px-0"
          )}
        >
          <motion.div
            variants={logoVariants}
            className="flex-shrink-0 flex items-center font-bold text-stone-900 dark:text-stone-100 pl-3 pr-2 gap-2 text-sm tracking-tight"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse" />
            <span>InScope Tech</span>
          </motion.div>
          
          <motion.div
            className={cn(
              "hidden md:flex items-center gap-2 pr-2",
              !isExpanded && "pointer-events-none"
            )}
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-semibold text-stone-700 hover:text-emerald-800 dark:text-stone-300 dark:hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800/60"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>

          <div className="md:hidden flex items-center pr-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileOpen(!isMobileOpen);
              }}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
              aria-label="Abrir Menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              variants={collapsedIconVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <Menu className="h-5 w-5 text-stone-800 dark:text-stone-200" />
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Sheet */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className="fixed top-20 left-4 right-4 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 border-b border-stone-200 pb-2">Navegação InScope</div>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-base font-bold text-stone-800 dark:text-stone-100 hover:text-emerald-700 py-2 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-mono opacity-50">→</span>
                </a>
              ))}
            </div>
            <a
              href="https://wa.me/5548935005396?text=Olá%20InScope!%20Gostaria%20de%20um%20orçamento."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Phone className="h-4 w-4" />
              Solicitar Orçamento WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
