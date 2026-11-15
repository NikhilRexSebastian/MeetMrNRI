import { useState } from "react";
import { services, serviceCategories } from "../data/services.js";
import { getWhatsAppUrl } from "../config/site.js";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All services");
  const visibleServices = services.filter(
    (service) =>
      activeCategory === "All services" || service.category === activeCategory,
  );

  return (
    <section id="services" className="section services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A LITTLE HELP GOES A LONG WAY</p>
          <h2>
            Life in Kerala, <em>taken care of.</em>
          </h2>
        </div>
        <p>
           <h3>Meet Mr. Ex-NRI</h3>

          <p>
           Having spent more than 10 years living in the UK before returning to Kerala,
           I understand what it means to build a life abroad while caring for home.
           That experience inspired me to create a service that helps fellow NRIs
          with the things that matter most.
          </p>

           <p>
           From planning your next visit to helping your parents with everyday needs —
            start with what matters to you.
           </p>

          <h3>Jiby Mathew</h3>
          <p><strong>Founder</strong></p>
          </p>
      </div>
      <div className="filters" role="group" aria-label="Filter services">
        {serviceCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={activeCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="service-grid">
        {visibleServices.map((service) => (
          <article
            className={`service-card ${service.category === "Family" ? "family" : ""}`.trim()}
            key={service.id}
          >
            <div className="card-top">
              <span>{service.id}</span>
              <small>{service.category}</small>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a
              href={getWhatsAppUrl(service.title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${service.title}`}
            >
              Let’s discuss <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
