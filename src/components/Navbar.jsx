import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

// Navigation items
const navItems = ["Resume", "About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY > 100) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      opacity: isNavVisible ? 1 : 0.5,
      duration: 0.3,
      backgroundColor: isNavVisible ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-7">
            <a href="/" className="special-font">
              <h1 className="hero-heading text-blue-100 text-4xl sm:text-5xl md:text-6xl transition-all duration-300 ease-in-out hover:scale-110 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-blue-400 to-purple-600">
                K<b>K</b>
              </h1>
            </a>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item === "Resume" ? "/resume" : `/#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Button */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="text-white text-3xl"
              >
                {isMobileMenuOpen ? "×" : "☰"}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-transparent text-white py-4 md:hidden">
            <div className="flex flex-col items-end space-y-4"> {/* Align text to the right */}
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item === "Resume" ? "/resume" : `/#${item.toLowerCase()}`}
                  className="text-xl hover:text-blue-400 transition duration-200"
                  onClick={toggleMobileMenu} // Close the menu when clicking a link
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
