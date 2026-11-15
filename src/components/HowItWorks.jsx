const steps = [
  {
    title: "Tell us what you need",
    description:
      "Send us a message on WhatsApp with your request and the location in India.",
  },
  {
    title: "Discuss the details",
    description:
      "We’ll discuss the scope, availability, timing and costs with you.",
  },
  {
    title: "Agree on the next steps",
    description:
      "Once you’re comfortable with the details, we can coordinate the agreed assistance.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section process">
      <div>
        <p className="eyebrow">START WITH A HELLO</p>
        <h2>
          Less distance.
          <br />
          <em>Less to figure out.</em>
        </h2>
        <p>
          No long forms. Tell us what you need, and we’ll take the conversation
          from there.
        </p>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="step">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
