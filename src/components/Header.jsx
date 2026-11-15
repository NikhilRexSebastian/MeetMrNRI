import Brand from "./Brand.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function Header() {
  return (
    <header className="header">
      <Brand />
      <nav aria-label="Main navigation">
        <a href="#services">Our services</a>
        <a href="#how-it-works">How it works</a>
        <a href="#contact">Get in touch</a>
      </nav>
      <WhatsAppButton label="Let’s talk" className="small" />
    </header>
  );
}
