// Add or update service cards here. Categories also appear in the filter buttons.
export const services = [
  {
    id: "01",
    title: "Holiday packages",
    description:
      "Make your next visit feel like a holiday. Get help planning a trip around the places and people you want to see.",
    category: "Travel",
  },
  {
    id: "02",
    title: "Home maintenance",
    description:
      "From a small repair to keeping an eye on your home, discuss the practical help your property needs.",
    category: "Home",
  },
  {
    id: "03",
    title: "Airport pickup & drop-off",
    description:
      "**Enjoy reliable airport pickup and drop-off between the airport and home, at competitive prices.**",
    category: "Travel",
  },
  {
    id: "04",
    title: "Property sale assistance",
    description:
      "Get help coordinating local property sale enquiries and the next steps while you are abroad.",
    category: "Home",
  },
  {
    id: "05",
    title: "Courier assistance",
    description:
      "Need something sent from Kerala? Discuss collection, packing and delivery arrangements.",
    category: "Everyday",
  },
  {
    id: "06",
    title: "Bill payment assistance",
    description:
      "Get help coordinating household bills and understanding what needs to be paid back home.",
    category: "Everyday",
  },
  {
    id: "07",
    title: "Support for elderly parents",
    description:
      "Discuss practical day-to-day assistance, visits and coordination for your parents in Kerala.",
    category: "Family",
  },
  {
  id: "08",
  title: "Car rental in Kerala",
  description:
    "Get help arranging a rental car for your visit to Kerala. Discuss your location, dates and travel needs.",
  category: "Travel",
},
{
  id: "09",
  title: "Urgent assistance",
  description:
    "Need urgent support in Kerala? Contact us for help coordinating local assistance, arranging transport, reaching family members, or booking hospital appointments.",
  category: "Family",
},
];

export const serviceCategories = [
  "All services",
  ...new Set(services.map((service) => service.category)),
];
