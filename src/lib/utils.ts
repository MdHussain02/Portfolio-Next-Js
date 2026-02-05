// Combine class names - simple utility without external dependencies
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Format phone number for tel: links
export function formatPhoneLink(phone: string) {
  return phone.replace(/\D/g, "");
}

// Truncate text with ellipsis
export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
