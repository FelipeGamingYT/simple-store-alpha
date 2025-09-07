interface YouTubeEmbedProps {
  videoId: string;
  autoplay?: boolean;
  onStateChange?: (state: number) => void;
}

export const YouTubeEmbed = ({ videoId, autoplay = false }: YouTubeEmbedProps) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: '1',
    modestbranding: '1',
    rel: '0',
    showinfo: '0',
  })}`;

  return (
    <div className="aspect-video w-full">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};