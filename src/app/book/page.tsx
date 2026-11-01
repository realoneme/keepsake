import type { Metadata } from 'next';
import { FieldRow, SelectField, TextareaField, TextField } from '@/components/form-fields';
import { Heading } from '@/components/heading';
import { InquiryForm } from '@/components/inquiry-form';
import { AlbumCheckbox } from '@/components/album-checkbox';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Book a session',
  description: 'Tell us the day. We reply within two days with what we have free.',
};

const sessions = [
  { value: 'wedding', title: 'Wedding' },
  { value: 'engagement', title: 'Engagement' },
  { value: 'family', title: 'Family' },
  { value: 'maternity', title: 'Maternity or newborn' },
  { value: 'portrait', title: 'Portrait' },
  { value: 'event', title: 'Birthday or small event' },
  { value: 'brand', title: 'Brand or business' },
  { value: 'other', title: 'Something else' },
];

const next = ['We reply within two days with what we have free.', 'A 20-minute call to plan the day, the places and the light.', 'A [30%] deposit holds the date. The rest is due two weeks before.'];

export default function BookPage() {
  return (
    <section className="ks-section ks-section-first ks-section-last">
      <div className="ks-content ks-split ks-split-form">
        <div className="ks-form-intro">
          <Heading
            page
            label="Book a session"
            title="Tell us the day. We’ll keep it."
            lead="Weddings book about a year ahead; most other sessions a few weeks. Write even if your date is close; we often have a free morning."
          />
          <div className="ks-next-steps">
            <h2 className="pa-label-caps">What happens next</h2>
            <ol className="ks-facts">
              {next.map((line, i) => (
                <li key={line}>
                  <span className="pa-note ks-seal">{i + 1}</span>
                  <span className="ks-ui">{line}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="ks-contact-card">
            <p className="ks-note-sm ks-wood">or just write</p>
            <a className="pa-h4" href={`mailto:${site.email}`}>
              {site.emailLabel}
            </a>
            <p className="ks-small ks-muted">
              {site.phoneLabel} · {site.city}
            </p>
          </div>
        </div>
        <InquiryForm kind="session" label="Check my date">
          <FieldRow>
            <TextField label="Your name" name="name" required placeholder="Mara Lindqvist" autoComplete="name" />
            <TextField label="Email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
          </FieldRow>
          <FieldRow>
            <SelectField label="Session" name="session" required options={sessions} />
            <TextField label="Date" name="date" type="date" />
          </FieldRow>
          <FieldRow>
            <TextField label="Where" name="place" placeholder="A town, a venue or “not sure yet”" />
            <TextField label="Phone" name="phone" type="tel" placeholder="optional" autoComplete="tel" />
          </FieldRow>
          <TextareaField label="Tell us about the day" name="message" placeholder="Who is coming, what you love, what you dread." />
          <AlbumCheckbox />
        </InquiryForm>
      </div>
    </section>
  );
}
