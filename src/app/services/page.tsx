import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Heading } from '@/components/heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from 'paper-album-ui';
import { faq } from '@/content/faq';
import { packages } from '@/content/packages';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services & prices',
  description: 'Three starting points, and a quote for anything else. Every session ends with a private gallery and an album.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="ks-section ks-section-header">
        <div className="ks-content">
          <Heading
            page
            label="Services & prices"
            title="Ways to spend a day with us."
            lead={`Three starting points, and a quote for anything else. Every session ends with a private gallery and an album. Prices include travel within [80 km] of ${site.city}.`}
          />
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-cards ks-cards-3">
          {packages.map((item) => (
            <article key={item.name} className="ks-package">
              <div className="ks-package-name">
                <h2 className="pa-h3">{item.name}</h2>
                {item.mostBooked ? <span className="ks-badge">Most booked</span> : null}
              </div>
              <p className="ks-price">
                <span className="ks-small ks-muted">{item.priceNote}</span>
                <span className="pa-h1">${item.price.toLocaleString('en-US')}</span>
              </p>
              <p className="ks-body ks-muted">{item.summary}</p>
              <ul className="ks-includes">
                {item.includes.map((line) => (
                  <li key={line} className="ks-ui">
                    <Check className="pa-i sm" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <Button asChild className="ks-package-book">
                <Link href="/book">Book this session</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="ks-section ks-section-group">
        <div className="ks-content ks-band ks-band-raised">
          <div className="ks-band-text">
            <p className="pa-note ks-seal ks-tilt">Not on the list?</p>
            <h2 className="pa-h3">Engagements, maternity, newborns, birthdays, small events, brand portraits.</h2>
            <p className="ks-body ks-muted">Tell us about the day and we reply within two days with a plan and a price. It still ends in an album.</p>
          </div>
          <Button asChild>
            <Link href="/book">
              Ask for a quote
              <ArrowRight className="pa-i sm" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-band ks-band-sunken">
          <div className="ks-band-text">
            <h2 className="pa-h3">Already have photographs?</h2>
            <p className="ks-body ks-muted">We bind albums from any photographs, from last summer or from 1974. Choose the size, cover and pages, and we design the sequence with you.</p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/printed-albums">
              Design an album
              <ArrowRight className="pa-i sm" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <section className="ks-section ks-section-last">
        <div className="ks-content ks-split ks-split-faq">
          <div className="ks-heading">
            <p className="pa-label-caps ks-wood">Questions</p>
            <h2 className="pa-h2">Before you book</h2>
            <p className="ks-body ks-ground-muted">
              Anything else? Write to <a href={`mailto:${site.email}`}>{site.emailLabel}</a> and we answer within two days.
            </p>
          </div>
          <Accordion defaultValue={[faq[0].question]}>
            {faq.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
