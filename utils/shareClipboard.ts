import toast from "react-hot-toast";

export async function handleShareClipboard() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link berhasil disalin!");
  } catch (err) {
    console.error("Gagal menyalin link", err);
    toast.error("Oppss, link gagal disalin");
  }
}
