import WhatsAppButton from "./WhatsAppButton.jsx";
import { site, getWhatsAppUrl } from "../config/site.js";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <p className="eyebrow">HOME IS JUST A MESSAGE AWAY</p>
      <h2>
        What can we help you
        <br />
        <em>with back home?</em>
      </h2>
      <p>A visit, a home, a parent, an everyday task. Let’s talk about it.</p>
      <WhatsAppButton />
      <a
        className="phone"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        {site.displayPhone}
      </a>
      <small>
        Services, locations, timings and charges are confirmed individually.
      </small>
    </section>
  );
}
