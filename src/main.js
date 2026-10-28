import './style.css';
import { finalPrice, validate } from './registration.js';

const FIELDS = ['name', 'email', 'ticket', 'promo', 'privacy'];

const form = document.querySelector('#registration');
const confirmation = document.querySelector('#confirmation');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const errors = validate(data);

  for (const field of FIELDS) {
    document.querySelector(`#${field}-error`).textContent = errors[field] ?? '';
  }

  const isValid = Object.keys(errors).length === 0;
  confirmation.textContent = isValid
    ? `Registration confirmed: ${data.name.trim()}, €${finalPrice(data.ticket, data.promo)}`
    : '';
});
