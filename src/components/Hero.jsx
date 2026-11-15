import WhatsAppButton from "./WhatsAppButton.jsx";

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
        <p className="quiet">One conversation. A helping hand in Kerala.</p>
      </div>

      <div
        className="hero-art"
        role="img"
        aria-label="Illustration of a home in Kerala. Home is more than a place. Let’s help you look after it."
      >
        <div className="sun" />
        <div className="arch">
          <div className="roof" />
          <div className="house">
            <span className="window w1" />
            <span className="window w2" />
            <span className="door" />
          </div>
          <div className="plant p1">✳</div>
          <div className="plant p2">✳</div>
          <div className="path" />
        </div>
        <span className="art-note top">A little closer, every day.</span>
        <div className="art-label">
          <span>⌂</span>
          <div>
            <b>Home is more than a place.</b>
            <small>Let’s help you look after it.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
