import { fetcher } from "@/utils/fetcher";
import { X } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

type ImagePreviewProps = {
  images: { url: string }[];
  setImages: Dispatch<SetStateAction<{ url: string }[]>>;
};

export default function ImagePreview({ images, setImages }: ImagePreviewProps) {
  const { data } = useSession();
  if (!images.length) return null;

  async function handleDeleteImage(url: string) {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    await toast.promise(
      fetcher({
        url: `/ai/chat/images?key=${cleanPath}`,
        method: "DELETE",
        token: data?.user.access_token,
      }),
      {
        loading: "Menghapus gambar...",
        success: () => {
          setImages((prev) => prev.filter((image) => image.url !== url));

          return "Gambar berhasil dihapus!";
        },
        error: (err) => {
          console.error(err);
          return "Ups sepertinya ada kesalahan ketika menghapus gambar!";
        },
      },
    );
  }

  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      {images.map((image, index) => (
        <div key={index} className="group relative">
          <div className="size-20 overflow-hidden rounded-xl border-2 border-gray/5">
            <img
              src={image.url}
              alt={`Preview ${index + 1}`}
              className="size-full object-cover object-center"
            />
          </div>

          <button
            onClick={() => handleDeleteImage(image.url)}
            className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-danger text-white opacity-0 transition-opacity duration-200 hover:bg-danger-600 group-hover:opacity-100"
          >
            <X size={16} weight="bold" />
          </button>
        </div>
      ))}
    </div>
  );
}
