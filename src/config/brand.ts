/**
 * Central Brand Configuration
 * Change brand name, tagline, showroom address, contact numbers in this single file.
 */
export const brandConfig = {
  name: "The Furniture Guy",
  shortName: "TFG",
  monogram: "TFG",
  tagline: "Furniture crafted for the way you live",
  description: "Bespoke handcrafted British furniture for high-end residential spaces, penthouses, and heritage homes across the United Kingdom.",
  establishedYear: 2008,
  
  contact: {
    phone: "+44 20 7946 0880",
    phoneDisplay: "020 7946 0880",
    whatsappNumber: "447000000000",
    whatsappDisplay: "+44 7000 000000",
    whatsappUrl: "https://wa.me/447000000000",
    email: "concierge@thefurnitureguy.co.uk",
    salesEmail: "orders@thefurnitureguy.co.uk",
  },
  
  showroom: {
    name: "London Design Flagship & Atelier",
    addressLine1: "14 Queenstown Road",
    addressLine2: "Battersea Design Quarter",
    city: "London",
    postcode: "SW11 4EZ",
    country: "United Kingdom",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.5828773950293!2d-0.14920272337772675!3d51.48418041240215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605151590e8db%3A0x8dd0cf1e05a81577!2sBattersea%20Park!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
    openingHours: {
      weekday: "Monday – Friday: 09:30 – 19:00",
      saturday: "Saturday: 10:00 – 18:30",
      sunday: "Sunday: 11:00 – 17:00 (Private viewings available)",
    },
  },

  social: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    facebook: "https://facebook.com",
  },

  delivery: {
    freeThreshold: 1500,
    londonDeliveryCost: 0,
    ukStandardDeliveryCost: 45,
    whiteGloveAssemblyCost: 95,
  },

  coupons: {
    WELCOME10: { code: "WELCOME10", discountPercent: 10, description: "10% off your first order" },
    TFG50: { code: "TFG50", discountAmount: 50, description: "£50 off orders over £500" },
  },

  stats: [
    { value: "16+", label: "Years of British Craft" },
    { value: "12,000+", label: "Homes Furnished" },
    { value: "10-Year", label: "Structural Guarantee" },
    { value: "London & UK", label: "White Glove Delivery" },
  ]
};
