import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

// Navigation items
const navItems = ["Resume", "About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
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
                  href={
                    item === "Resume" ? "/resume" : `/#${item.toLowerCase()}`
                  }
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Button */}
            <div className="relative ml-10">
              <button
                onClick={toggleAudioIndicator}
                className="relative z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white shadow-lg"
                title={isAudioPlaying ? "Pause Audio" : "Play Audio"} // Tooltip
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {isAudioPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Wave Effect */}
              {isAudioPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute w-14 h-14 bg-blue-500 opacity-30 rounded-full animate-ping" />
                  <span className="absolute w-20 h-20 bg-blue-400 opacity-20 rounded-full animate-ping" />
                  <span className="absolute w-28 h-28 bg-blue-300 opacity-10 rounded-full animate-ping" />
                </div>
              )}
            </div>

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
            <div className="flex flex-col items-end space-y-4">
              {" "}
              {/* Align text to the right */}
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={
                    item === "Resume" ? "/resume" : `/#${item.toLowerCase()}`
                  }
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
