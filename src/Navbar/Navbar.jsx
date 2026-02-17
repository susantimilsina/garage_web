import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Define navigation items
  const navItems = [
    { href: "home", label: "Home" },
    { href: "why_choose_us", label: "Why Choose Us" },
    { href: "how_it_works", label: "How it works" },
    { href: "get_the_app", label: "Get the App" },
    { href: "faqs", label: "FAQs" },
    { href: "about_us", label: "About us" },
  ];

  const scrollToSection = (href) => {
    const element = document.getElementById(href);
    if (element) {
      const navHeight = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setActiveSection(href);
    setIsOpen(false);
  };
  // Handle scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.getElementById(item.href)
      );
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reusable button component
  const NavButton = ({ item, isMobile = false }) => (
    <button
      onClick={() => scrollToSection(item.href)}
      className={`
        text-brand-text-color px-3 py-2 rounded-md font-medium  font-rethink
        ${
          isMobile
            ? "block text-base w-full text-left"
            : "text-base lg:text-base md:text-sm"
        }
        ${
          activeSection === item.href
            ? "text-[#995524]"
            : "hover:text-[#995524]"
        }
      `}
    >
      {item.label}
    </button>
  );
  return (
    <nav className="fixed container mx-auto bg-white top-0 left-0 right-0 z-50 pt-3">
      <div className="">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "100px", width: "100px" }}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 md:text-sm">
            {navItems.map((item) => (
              <NavButton key={item?.label} item={item} />
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <svg
                  fill="#524342"
                  width="80px"
                  height="80px"
                  className="w-7 h-7"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <NavButton key={item?.label} item={item} isMobile={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
