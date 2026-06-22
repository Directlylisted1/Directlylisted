import { WHATSAPP_LINK, WHATSAPP_QR } from "@/lib/social";

/** Official WhatsApp glyph in brand green (#25D366). */
function WhatsAppGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.5 1.128 6.744 3.046 9.376L1.05 31.2l6.024-1.926A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.826 32 16S24.83 0 16.004 0Zm9.318 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.602-1.202-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.528-1.9-4.822 0-2.294 1.166-3.422 1.636-3.902.386-.394.836-.574 1.31-.574.152 0 .29.008.414.014.376.016.564.038.812.63.308.742 1.06 2.586 1.15 2.77.092.184.184.434.06.744-.116.318-.218.458-.434.706-.218.248-.424.438-.642.704-.198.232-.422.482-.172.912.25.422 1.114 1.836 2.392 2.974 1.65 1.468 3.018 1.922 3.498 2.122.358.148.784.112 1.044-.17.33-.36.738-.956 1.152-1.544.294-.42.666-.472 1.056-.324.398.14 2.522 1.19 2.954 1.406.432.214.718.318.824.498.104.18.104 1.04-.282 2.13Z" />
    </svg>
  );
}

/**
 * WhatsApp Business contact block. `block` shows the green logo, the QR code,
 * and the instruction message; `inline` is a compact green-logo link for tight
 * spaces like the footer.
 */
export function WhatsAppContact({
  variant = "block",
  className = "",
}: {
  variant?: "block" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Directly Listed on WhatsApp"
        className={`inline-flex items-center gap-2 text-[#25D366] hover:opacity-80 ${className}`}
      >
        <WhatsAppGlyph className="h-5 w-5" />
        <span className="text-sm font-medium">Chat on WhatsApp</span>
      </a>
    );
  }

  return (
    <div className={`rounded-2xl border border-white/15 bg-white/5 p-5 text-center ${className}`}>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Directly Listed on WhatsApp"
        className="mx-auto flex w-fit items-center gap-2 text-[#25D366] hover:opacity-80"
      >
        <WhatsAppGlyph className="h-9 w-9" />
        <span className="text-base font-semibold">WhatsApp</span>
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the Directly Listed WhatsApp chat"
        className="mt-4 inline-block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WHATSAPP_QR}
          alt="Scan this QR code to chat with Directly Listed on WhatsApp"
          width={160}
          height={160}
          className="mx-auto h-40 w-40 rounded-xl bg-white p-2"
        />
      </a>
      <p className="mx-auto mt-4 max-w-xs text-sm text-white/75">
        Contact us on WhatsApp by clicking the green icon or scan the QR.
      </p>
    </div>
  );
}
