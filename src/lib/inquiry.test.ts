import { describe, expect, it } from 'vitest';
import { inquiryEmail, parseInquiry } from './inquiry';

const session = { kind: 'session', name: 'Mara', email: 'mara@example.com', session: 'wedding' };

describe('parseInquiry', () => {
  it('accepts a complete session enquiry', () => {
    expect(parseInquiry({ ...session, place: ' Lisbon ' })).toEqual({
      ok: true,
      inquiry: { kind: 'session', name: 'Mara', email: 'mara@example.com', details: { session: 'wedding', place: 'Lisbon' } },
    });
  });

  it('rejects a missing required field', () => {
    expect(parseInquiry({ kind: 'album', name: 'Ada', email: 'ada@example.com', size: '20x25' })).toEqual({ ok: false, error: 'missing' });
  });

  it('rejects a malformed email and an unknown kind', () => {
    expect(parseInquiry({ ...session, email: 'not-an-email' })).toEqual({ ok: false, error: 'missing' });
    expect(parseInquiry({ ...session, kind: 'other' })).toEqual({ ok: false, error: 'invalid' });
  });

  it('rejects the honeypot and drops unknown fields', () => {
    expect(parseInquiry({ ...session, website: 'spam.example' })).toEqual({ ok: false, error: 'invalid' });
    const parsed = parseInquiry({ ...session, admin: 'true' });
    expect(parsed.ok && parsed.inquiry.details).toEqual({ session: 'wedding' });
  });

  it('rejects an overlong message', () => {
    expect(parseInquiry({ ...session, message: 'x'.repeat(4001) })).toEqual({ ok: false, error: 'too_long' });
  });
});

describe('inquiryEmail', () => {
  it('keeps a name from adding lines to the subject', () => {
    const email = inquiryEmail({ kind: 'album', name: 'Ada\r\nBcc: x', email: 'a@b.co', details: {} });
    expect(email.subject).toBe('Album enquiry from Ada Bcc: x');
  });
});
