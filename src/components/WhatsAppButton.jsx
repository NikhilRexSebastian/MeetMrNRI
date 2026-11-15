import { getWhatsAppUrl } from "../config/site.js";

export default function WhatsAppButton({
  label = "Chat on WhatsApp",
  service,
  className = "",
}) {
  return (
    <a
      href={getWhatsAppUrl(service)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button ${className}`.trim()}
    >
      <span aria-hidden="true">↗</span>
      {label}
    </a>
  );
}
