/**
 * Star Furniture Centralized Contact & WhatsApp Configuration
 */

export const CONTACT_CONFIG = {
  brandName: 'Star Furniture',
  tagline: 'COMFORT • QUALITY • TRUST',
  phoneDisplay: '+91 99999 99999',
  phoneNumber: '919999999999',
  email: 'contact@starfurniture.com',
  showroomAddress: 'Star Furniture Flagship Store, Main Furniture Hub Avenue, Metro City',
  hours: 'Monday – Sunday: 10:00 AM – 9:00 PM',
};

export const getWhatsAppUrl = (customMessage?: string): string => {
  const defaultText = `Hi Star Furniture, I am interested in exploring your furniture collection.`;
  const encodedText = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${CONTACT_CONFIG.phoneNumber}?text=${encodedText}`;
};
