export function getPreviewFromHTML(html: string, wordLimit = 20): string {
  const tempEl =
    typeof window !== "undefined" ? document.createElement("div") : null;

  if (!tempEl) return "";

  tempEl.innerHTML = html;
  const text = tempEl.textContent || tempEl.innerText || "";

  const words = text.trim().split(/\s+/);
  const sliced = words.slice(0, wordLimit).join(" ");

  return words.length > wordLimit ? `${sliced}...` : sliced;
}
