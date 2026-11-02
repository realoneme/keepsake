'use client';

import { useId, type ReactNode } from 'react';
import { Input, type InputProps, Label, NativeSelect, NativeSelectOption, RadioGroup, RadioGroupItem, Textarea } from 'paper-album-ui';

const star = (required?: boolean) => (required ? ' *' : '');

export function TextField({ label, required, ...props }: InputProps & { label: string; required?: boolean }) {
  const id = useId();
  return (
    <div className="ks-field">
      <Label htmlFor={id}>
        {label}
        {star(required)}
      </Label>
      <Input id={id} required={required} {...props} />
    </div>
  );
}

export function TextareaField({ label, name, placeholder }: { label: string; name: string; placeholder: string }) {
  const id = useId();
  return (
    <div className="ks-field">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={name} placeholder={placeholder} rows={5} />
    </div>
  );
}

export function SelectField({ label, name, required, options }: { label: string; name: string; required?: boolean; options: { value: string; title: string }[] }) {
  const id = useId();
  return (
    <div className="ks-field">
      <Label htmlFor={id}>
        {label}
        {star(required)}
      </Label>
      <NativeSelect id={id} name={name} required={required} defaultValue={options[0].value}>
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.title}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}

export function ChoiceField({ label, name, options }: { label: string; name: string; options: { value: string; title: string; hint?: string }[] }) {
  const id = useId();
  return (
    <div className="ks-field">
      <span className="pa-label" id={id}>
        {label} *
      </span>
      <RadioGroup name={name} defaultValue={options[0].value} required aria-labelledby={id} className="ks-choices">
        {options.map((option) => (
          <RadioGroupItem key={option.value} value={option.value}>
            <span className="ks-choice-text">
              <span className="ks-ui">{option.title}</span>
              {option.hint ? <span className="pa-caption">{option.hint}</span> : null}
            </span>
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </div>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="ks-field-row">{children}</div>;
}
