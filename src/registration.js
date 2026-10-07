// Ticket prices in euros
export const TICKETS = { general: 120, student: 60 };

// Promo codes and their discount in percent
export const PROMO_CODES = { FRIENDS10: 10, EARLYBIRD: 20 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an object with one error message per invalid field (empty if valid)
export function validate({ name, email, ticket, promo, privacy }) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!EMAIL.test(email)) errors.email = 'Enter a valid email address';
  if (!Object.hasOwn(TICKETS, ticket)) errors.ticket = 'Choose a ticket type';
  if (promo && !Object.hasOwn(PROMO_CODES, promo)) errors.promo = 'Unknown promo code';
  if (!privacy) errors.privacy = 'You must accept the privacy policy';
  return errors;
}

// Returns the final price in euros for valid data
export function finalPrice(ticket, promo) {
  const discount = promo ? PROMO_CODES[promo] : 0;
  return (TICKETS[ticket] * (100 - discount)) / 100;
}
