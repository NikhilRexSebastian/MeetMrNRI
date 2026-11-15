import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { getWhatsAppUrl } from "./config/site.js";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="ribbon">
          <span>Your people.</span>
          <span>Your home.</span>
          <span>Your plans.</span>
          <b>A helping hand for it all.</b>
        </div>
        <Services />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <a
        className="floating-chat"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Meet Mr NRI on WhatsApp"
      >
        WhatsApp ↗
      </a>
    </>
  );
}
