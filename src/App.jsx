import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Resume from "./components/Resume"; // Import your Resume component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={
          <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Hero />
            <About />
            <Features />
            <Story />
            <Contact />
            <Footer />
          </main>
        } />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
