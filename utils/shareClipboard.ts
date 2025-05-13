import toast from "react-hot-toast";

export async function handleShareClipboard() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Bagikan link berhasil disalin!");
  } catch (err) {
    console.error("Gagal untuk membagikan link!", err);
    toast.error("Oppss, link gagal disalin!");
  }
}
