'use client';

import { useId } from 'react';
import { Checkbox, Label } from 'paper-album-ui';

export function AlbumCheckbox() {
  const id = useId();
  return (
    <div className="ks-check">
      <Checkbox id={id} name="printed_album" value="yes" />
      <Label htmlFor={id}>I’d like a printed album with the session</Label>
    </div>
  );
}
