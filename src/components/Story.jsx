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
            title="Why <b>I</b> BECAME <br /> A DEVELO<b>P</b>ER"
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
          <p className="max-w-sm px-4 text-center font-circular-web text-violet-50 md:text-start md:px-0">
            Bcoz, Being nothing my loved once left me.. does that make me
            developer No! I came from long way to to show me who I am some
            thoughts deeply hit me to Be Developer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloatingVideo;
