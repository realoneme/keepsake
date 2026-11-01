import { NextResponse } from 'next/server';
import { inquiryEmail, parseInquiry } from '@/lib/inquiry';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseInquiry(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { RESEND_API_KEY, INQUIRY_TO, INQUIRY_FROM } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_TO) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const email = inquiryEmail(parsed.inquiry);
  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: INQUIRY_FROM || 'Keepsake <onboarding@resend.dev>',
      to: [INQUIRY_TO],
      reply_to: parsed.inquiry.email,
      subject: email.subject,
      text: email.text,
    }),
  }).catch(() => null);

  if (!sent?.ok) return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
