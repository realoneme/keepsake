import type { Metadata } from 'next';
import Image from 'next/image';
import { ChoiceField, FieldRow, SelectField, TextareaField, TextField } from '@/components/form-fields';
import { Heading } from '@/components/heading';
import { InquiryForm } from '@/components/inquiry-form';
import { images } from '@/content/images';

export const metadata: Metadata = {
  title: 'Printed albums',
  description: 'Linen covers, archival cotton pages, stitched by hand and laid flat. Made from a session with us or from your own photographs.',
};

const steps = [
  { title: 'Choose', body: 'Pick the size, the cover and how many pages. Not sure? Start with a 30-page linen album.' },
  { title: 'Send', body: 'Book a session, or send us the photographs you already have. Up to 400 files.' },
  { title: 'We design', body: 'We lay out a first sequence and send it as a flip-through. You move, swap and remove prints.' },
  { title: 'You hold it', body: 'Printed on cotton rag, stitched, pressed for two days and posted in a linen box.' },
];

const prices = [
  ['20 × 25 cm, 30 pages', '$280'],
  ['24 × 30 cm, 50 pages', '$420'],
  ['30 × 30 cm, 80 pages', '$640'],
  ['Each extra 10 pages', '$45'],
];

const sizes = [
  { value: '20x25', title: '20 × 25 cm', hint: 'portrait, from $280' },
  { value: '24x30', title: '24 × 30 cm', hint: 'landscape, from $420' },
  { value: '30x30', title: '30 × 30 cm', hint: 'square, from $640' },
];

const covers = [
  { value: 'linen-sand', title: 'Sand linen', hint: 'warm, light' },
  { value: 'linen-walnut', title: 'Walnut linen', hint: 'deep brown' },
  { value: 'leather', title: 'Leather', hint: '+ $90' },
];

const sources = [
  { value: 'session', title: 'From a session with you' },
  { value: 'mine', title: 'My own photographs' },
];

const pages = ['30', '50', '80', '100'].map((value) => ({ value, title: `${value} pages` }));

export default function PrintedAlbumsPage() {
  const { open, box } = images.product;
  return (
    <>
      <section className="ks-section ks-section-first">
        <div className="ks-content ks-split ks-split-even">
          <div className="ks-heading">
            <Heading
              page
              label="Printed albums"
              title="The only thing in the house that remembers every face."
              lead="Linen covers, archival cotton pages, stitched by hand and laid flat. Made from a session with us or from the photographs already on your phone."
            />
            <p className="ks-from">
              <span className="pa-note ks-seal">from $280</span>
              <span className="ks-small ks-ground-muted">including design and shipping</span>
            </p>
          </div>
          <div className="ks-product">
            <Image src={open.src} width={open.width} height={open.height} alt={open.alt} sizes="(max-width: 1199px) 45vw, 250px" priority />
            <Image src={box.src} width={box.width} height={box.height} alt={box.alt} sizes="(max-width: 1199px) 45vw, 250px" />
          </div>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-stack-head">
          <Heading label="How it works" title="Four weeks from the first call to the parcel" />
          <ol className="ks-cards ks-cards-4 ks-steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="pa-note ks-seal">{i + 1}</span>
                <h3 className="pa-h4">{step.title}</h3>
                <p className="ks-small ks-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ks-section ks-section-last" id="design">
        <div className="ks-content ks-split ks-split-form">
          <div className="ks-form-intro">
            <Heading label="Design your album" title="Tell us what you have in mind" />
            <p className="ks-body ks-ground-muted">This is not a checkout. We reply with a quote, a first layout and a time to talk it through.</p>
            <dl className="ks-pricelist">
              {prices.map(([name, price]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
          <InquiryForm kind="album" label="Request a quote" aside="We reply within two days.">
            <ChoiceField label="Size" name="size" options={sizes} />
            <ChoiceField label="Cover" name="cover" options={covers} />
            <FieldRow>
              <SelectField label="Pages" name="pages" options={pages} />
              <TextField label="Names on the cover" name="cover_names" placeholder="Mara & Theo, June 2026" />
            </FieldRow>
            <ChoiceField label="Photographs" name="source" options={sources} />
            <FieldRow>
              <TextField label="Your name" name="name" required placeholder="Ada Okafor" autoComplete="name" />
              <TextField label="Email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
            </FieldRow>
            <TextareaField label="Anything we should know?" name="message" placeholder="A gift? A deadline? A box of old prints?" />
          </InquiryForm>
        </div>
      </section>
    </>
  );
}
