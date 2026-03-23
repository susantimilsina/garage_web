import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import logo from "../assets/logo.png";

const Navbar = () => {
  const lastConfettiRef = useRef(0);
  const fireConfetti = useCallback((throttleMs = 0) => {
    const now = Date.now();
    if (throttleMs && now - lastConfettiRef.current < throttleMs) return;
    lastConfettiRef.current = now;
    const rect = document.querySelector("[data-find-sales]")?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.2;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ["#BC2032", "#368841", "#995524", "#255099", "#FFC4CB"],
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isSalesActive = location.pathname === "/sales";

  const navItems = [
    { href: "home", label: "Home", path: "/" },
    { path: "/sales", label: "Find Sales", isCta: true },
    { href: "how_it_works", label: "How It Works" },
    { href: "why_choose_us", label: "Why Choose Us" },
    { href: "faqs", label: "FAQs" },
    { href: "get_the_app", label: "Download", isCta: true },
  ];

  const scrollToSection = (href) => {
    const element = document.getElementById(href);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setActiveSection(href);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = navItems
        .filter((i) => i.href)
        .map((i) => document.getElementById(i.href));
      const scrollPosition = window.scrollY + 80;
      sections.forEach((section) => {
        if (section) {
          const { offsetTop, clientHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + clientHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavButton = ({ item, isMobile = false }) => {
    const textClass = `font-medium font-rethink text-brand-text-color ${
      isMobile ? "block w-full text-left py-3 px-4" : "px-4 py-2"
    }`;
    const activeClass = "text-brand-brown";
    const hoverClass = "hover:text-brand-brown";

    if (item.path === "/sales") {
      return (
        <Link
          to="/sales"
          onClick={() => {
            setIsOpen(false);
            fireConfetti();
          }}
          onMouseEnter={() => !isMobile && fireConfetti(1500)}
          data-find-sales
          className={`relative overflow-visible ${textClass} ${isSalesActive ? activeClass : hoverClass} ${
            item.isCta && !isMobile
              ? "bg-brand-blue text-white hover:bg-brand-blue/90 hover:text-white rounded-full ring-2 ring-brand-red/40 shadow-lg hover:shadow-xl transition-all duration-300"
              : ""
          }`}
        >
          {item.label}
        </Link>
      );
    }
    if (item.path === "/" && !isHomePage) {
      return (
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={`${textClass} ${hoverClass}`}
        >
          {item.label}
        </Link>
      );
    }
    if (item.href === "get_the_app" && item.isCta && !isMobile) {
      return isHomePage ? (
        <button
          onClick={() => scrollToSection("get_the_app")}
          className={`${textClass} border-2 border-brand-blue rounded-full hover:bg-brand-blue hover:text-white transition-colors`}
        >
          {item.label}
        </button>
      ) : (
        <Link
          to="/#get_the_app"
          onClick={() => setIsOpen(false)}
          className={`${textClass} border-2 border-brand-blue rounded-full hover:bg-brand-blue hover:text-white transition-colors`}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <button
        onClick={() => scrollToSection(item.href)}
        className={`${textClass} ${activeSection === item.href ? activeClass : hoverClass}`}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0" aria-label="Find Garage and Yard Sale - Home">
            <img
              src={logo}
              alt="Find Garage and Yard Sale"
              className="h-12 w-12 object-cover rounded-lg"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <NavButton key={item.label} item={item} />
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-brand-text-color hover:bg-brand-light-orange"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavButton key={item.label} item={item} isMobile />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
