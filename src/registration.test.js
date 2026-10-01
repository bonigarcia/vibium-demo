import { describe, expect, it } from 'vitest';
import { finalPrice, validate } from './registration.js';

const valid = {
  name: 'Ada Example',
  email: 'ada@example.com',
  ticket: 'general',
  promo: '',
  privacy: 'on',
};

describe('validate', () => {
  it('accepts valid data', () => {
    expect(validate(valid)).toEqual({});
  });

  it('requires a name', () => {
    expect(validate({ ...valid, name: '   ' })).toHaveProperty('name');
  });

  it.each(['', 'ada', 'ada@example', 'ada @example.com'])('rejects the email "%s"', (email) => {
    expect(validate({ ...valid, email })).toHaveProperty('email');
  });

  it('rejects an unknown ticket type', () => {
    expect(validate({ ...valid, ticket: 'vip' })).toHaveProperty('ticket');
  });

  it('accepts the FRIENDS10 promo code', () => {
    expect(validate({ ...valid, promo: 'FRIENDS10' })).toEqual({});
  });

  it('rejects an unknown promo code', () => {
    expect(validate({ ...valid, promo: 'FRIENDS50' })).toEqual({ promo: 'Unknown promo code' });
  });

  it('requires accepting the privacy policy', () => {
    expect(validate({ ...valid, privacy: undefined })).toHaveProperty('privacy');
  });

  it('reports every invalid field at once', () => {
    const errors = validate({ name: '', email: '', ticket: '', promo: 'NOPE', privacy: undefined });
    expect(Object.keys(errors)).toEqual(['name', 'email', 'ticket', 'promo', 'privacy']);
  });
});

describe('finalPrice', () => {
  it('charges €120 for a General ticket', () => {
    expect(finalPrice('general', '')).toBe(120);
  });

  it('charges €60 for a Student ticket', () => {
    expect(finalPrice('student', '')).toBe(60);
  });

  it('applies 10% off with FRIENDS10', () => {
    expect(finalPrice('general', 'FRIENDS10')).toBe(108);
    expect(finalPrice('student', 'FRIENDS10')).toBe(54);
  });
});
