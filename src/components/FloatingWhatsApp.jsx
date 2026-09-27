import { BRAND } from "../lib/content";

const MESSAGE = "Hi Rishi Home Interior, I'd like to know more about your interior design services.";

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rishi Home Interior on WhatsApp"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.3c1.8 1 3.8 1.5 5.9 1.5 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3Z"
          fill="#25D366"
        />
        <path
          d="M22.4 19c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.3-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4Z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
