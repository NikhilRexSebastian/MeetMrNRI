import WhatsAppButton from "./WhatsAppButton.jsx";
import JourneyHome from "./JourneyHome.jsx";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="dot" aria-hidden="true" />
          FOR KERALITES, WHEREVER LIFE TAKES YOU
        </div>

        <h1>
          Miles away.
          <br />
          Still close <em>to home.</em>
        </h1>

        <p className="intro">
          Your life is abroad. A part of your heart is in Kerala. Meet Mr NRI
          helps you take care of the people, places and everyday things that
          matter back home.
        </p>

        <div className="hero-actions">
          <WhatsAppButton />
          <a className="text-link" href="#services">
            Explore our services ↓
          </a>
        </div>

        <p className="quiet">
          One conversation. A helping hand in Kerala.
        </p>
      </div>

      <JourneyHome />
    </section>
  );
}