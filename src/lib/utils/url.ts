export function isValidHttpUrl(string: string | null | undefined): boolean {
  if (!string) return false;
  let url;

  try {
    url = new URL(string);
  } catch {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
