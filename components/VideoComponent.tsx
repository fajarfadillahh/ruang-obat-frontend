type VideoComponentProps = {
  url: string;
};

export default function VideoComponent({ url }: VideoComponentProps) {
  const videoID = new URL(url).searchParams.get("v");
  const embedURL = `https://www.youtube.com/embed/${videoID}`;

  return (
    <iframe
      allowFullScreen
      src={embedURL}
      title="Video Player"
      className="h-[300px] w-full max-w-[380px] border-0"
    />
  );
}
