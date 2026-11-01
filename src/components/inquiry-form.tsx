'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { site } from '@/content/site';
import type { InquiryKind } from '@/lib/inquiry';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

interface InquiryFormProps {
  kind: InquiryKind;
  label: string;
  aside?: string;
  children: ReactNode;
}

/** Posts the form to /api/inquiry and answers in place. */
export function InquiryForm({ kind, label, aside, children }: InquiryFormProps) {
  const [status, setStatus] = useState<Status>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, kind }),
    }).catch(() => null);
    setStatus(response?.ok ? 'sent' : 'failed');
  }

  if (status === 'sent') {
    return (
      <div className="ks-form ks-form-sent" role="status">
        <p className="pa-note ks-seal">Thank you.</p>
        <p className="pa-h3">It’s on its way to us.</p>
        <p className="ks-body ks-muted">We reply within two days.</p>
      </div>
    );
  }

  return (
    <form className="ks-form" onSubmit={submit}>
      {children}
      {/* left empty by people; bots fill it in */}
      <div className="ks-honeypot" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="ks-form-submit">
        <Button type="submit" variant="seal" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : label}
        </Button>
        {aside ? <p className="pa-caption">{aside}</p> : null}
      </div>
      {status === 'failed' ? (
        <p className="ks-form-error" role="alert">
          That didn’t send. Please write to <a href={`mailto:${site.email}`}>{site.emailLabel}</a> and we’ll take it from there.
        </p>
      ) : null}
    </form>
  );
}
