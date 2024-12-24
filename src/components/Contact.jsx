import { useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="Decorative Element" />
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const whatsappURL = `https://wa.me/919600455344?text=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
         
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">Join us</p>

          <AnimatedTitle
            title="For <b>M</b>ore Enquiry <br />  <br /> g<b>r</b>ow t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <div className="mt-10 w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white h-32"
                required
              />
              <Button
                title="Contact Us"
                containerClass="cursor-pointer"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
