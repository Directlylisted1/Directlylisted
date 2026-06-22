// components/seo/JsonLd.tsx
// -----------------------------------------------------------------------------
// Renders a JSON-LD <script>. Server component (no "use client").
// Pass any object from lib/jsonld.ts. Safe: JSON.stringify only, no user input.
// -----------------------------------------------------------------------------

import * as React from "react";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // JSON.stringify output is safe to inject; replace < to avoid </script> breakouts.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
