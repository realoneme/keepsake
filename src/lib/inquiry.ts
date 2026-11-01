/** What the booking and album forms send. Validated on the server; the browser's checks are only a courtesy. */
export type InquiryKind = 'session' | 'album';

export interface Inquiry {
  kind: InquiryKind;
  name: string;
  email: string;
  details: Record<string, string>;
}

const FIELDS: Record<InquiryKind, { required: string[]; optional: string[] }> = {
  session: { required: ['session'], optional: ['date', 'place', 'phone', 'message', 'printed_album'] },
  album: { required: ['size', 'cover', 'source'], optional: ['pages', 'cover_names', 'message'] },
};

const LIMIT = 4000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export type ParsedInquiry = { ok: true; inquiry: Inquiry } | { ok: false; error: string };

/** Accepts a JSON body from the forms. A filled `website` field is a bot: the honeypot is hidden from people. */
export function parseInquiry(body: unknown): ParsedInquiry {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'invalid' };
  const data = body as Record<string, unknown>;
  const kind = data.kind;
  if (kind !== 'session' && kind !== 'album') return { ok: false, error: 'invalid' };
  if (text(data.website)) return { ok: false, error: 'invalid' };

  const name = text(data.name);
  const email = text(data.email);
  if (!name || !EMAIL.test(email)) return { ok: false, error: 'missing' };

  const { required, optional } = FIELDS[kind];
  if (required.some((field) => !text(data[field]))) return { ok: false, error: 'missing' };

  const details: Record<string, string> = {};
  for (const field of [...required, ...optional]) {
    const value = text(data[field]);
    if (value) details[field] = value;
  }
  if ([name, email, ...Object.values(details)].some((value) => value.length > LIMIT)) return { ok: false, error: 'too_long' };

  return { ok: true, inquiry: { kind, name, email, details } };
}

export function inquiryEmail({ kind, name, email, details }: Inquiry) {
  const subject = `${kind === 'session' ? 'Session enquiry' : 'Album enquiry'} from ${name.replace(/[\r\n]+/g, ' ')}`;
  const lines = [`Name: ${name}`, `Email: ${email}`, ...Object.entries(details).map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)];
  return { subject, text: lines.join('\n') };
}
