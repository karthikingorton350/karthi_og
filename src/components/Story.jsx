import gsap from "gsap";
import { useRef, useState } from "react";

import AnimatedTitle from "./AnimatedTitle";

const FloatingVideo = () => {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div id="story" className="min-h-screen w-screen bg-black text-blue-50">
      <div className="flex flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px] text-center">
          Let u know why
        </p>

        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
          <AnimatedTitle
            title=" The Story Why <b>I</b> BECAME <br /> A DEVELO<b>P</b>ER"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-center"
          />

          <div className="story-video-container mt-5">
            <div className="story-video-mask">
              <div
                ref={frameRef}
                className="story-video-content"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src="/videos/story.mp4"
                  className="object-contain w-full rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center">
          {" "}
          {/* Reduced margin-top */}
          <button
            onClick={toggleSound}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg relative focus:outline-none hover:bg-blue-600 transition-all duration-200"
            style={{ cursor: "pointer" }}
          >
            {isMuted ? "Hit it 🔇" : "To get it 🔊"}
          </button>
        </div>
        <div className="mt-4 flex w-full flex-col items-center sm:mt-6 md:mt-8 lg:mt-10">
          {" "}
          {/* Reduced margin-top */}
          <p className="w-full px-6 text-center font-circular-web text-violet-50 md:text-start md:px-8 overflow-auto">
  You see, life had its dramatic plot twists. One day, my loved ones left me. Why? Because I was... well, let's just say, "being nothing" isn't a great personality trait. 😅

  But did that make me a developer? Nope, not even close! I mean, who becomes a developer by just sitting around doing nothing? So, I took a long, hard look at myself (and my empty wallet), and something clicked.

  Somewhere between existential crises and binge-watching cat videos, I realized I had to change. That’s when the thought hit me—"Why not code my way out of this mess?" So here I am, smashing bugs, building apps, and occasionally crying over semicolons.

  And you know what? Being a developer isn’t just a job; it’s my revenge arc. 💻✨
</p>



        </div>
      </div>
    </div>
  );
};

export default FloatingVideo;
