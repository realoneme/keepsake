import type { ReactNode } from 'react';

interface HeadingProps {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** The page's main heading, in the Display size. */
  page?: boolean;
}

export function Heading({ label, title, lead, page }: HeadingProps) {
  const Title = page ? 'h1' : 'h2';
  return (
    <div className="ks-heading">
      {label ? <p className="pa-label-caps ks-wood">{label}</p> : null}
      <Title className={page ? 'pa-display' : 'pa-h2'}>{title}</Title>
      {lead ? <p className="pa-lead">{lead}</p> : null}
    </div>
  );
}
