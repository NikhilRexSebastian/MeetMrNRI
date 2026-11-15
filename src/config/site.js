// Edit contact details here. Use country code + digits only in whatsappNumber.
export const site = {
  name: "Meet Mr NRI",
  whatsappNumber: "917025455544",
  displayPhone: "+91 70254 55544",
};

export function getWhatsAppUrl(service) {
  const message = service
    ? `Hi Meet Mr NRI, I would like help with ${service.toLowerCase()}. Please share the details.`
    : "Hi Meet Mr NRI, I live abroad and would like some help in Kerala. Can we discuss?";

  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
