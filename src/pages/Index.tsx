import { useState } from "react";
import { MusicPlayer, Track } from "@/components/MusicPlayer";
import { PlaylistItem } from "@/components/PlaylistItem";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { Card } from "@/components/ui/card";
import { Music, Headphones } from "lucide-react";

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playlist: Track[] = [
    {
      id: "1",
      title: "Shape of You",
      artist: "Ed Sheeran",
      youtubeId: "JGwWNGJdvx8",
      duration: "3:53",
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg"
    },
    {
      id: "2", 
      title: "Blinding Lights",
      artist: "The Weeknd",
      youtubeId: "4NRXx6U8ABQ",
      duration: "3:20",
      thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/mqdefault.jpg"
    },
    {
      id: "3",
      title: "Someone Like You",
      artist: "Adele", 
      youtubeId: "hLQl3WQQoQ0",
      duration: "4:45",
      thumbnail: "https://img.youtube.com/vi/hLQl3WQQoQ0/mqdefault.jpg"
    },
    {
      id: "4",
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      youtubeId: "OPf0YbXqDm0",
      duration: "4:30",
      thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg"
    },
    {
      id: "5",
      title: "Bad Guy",
      artist: "Billie Eilish",
      youtubeId: "DyDfgMOUjCI",
      duration: "3:14",
      thumbnail: "https://img.youtube.com/vi/DyDfgMOUjCI/mqdefault.jpg"
    },
    {
      id: "6",
      title: "Perfect",
      artist: "Ed Sheeran",
      youtubeId: "2Vv-BfVoq4g",
      duration: "4:23",
      thumbnail: "https://img.youtube.com/vi/2Vv-BfVoq4g/mqdefault.jpg"
    }
  ];

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(playlist.findIndex(t => t.id === track.id));
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!currentTrack && playlist.length > 0) {
      setCurrentTrack(playlist[0]);
      setCurrentTrackIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrack(playlist[prevIndex]);
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">YouTube Music Player</h1>
            <Headphones className="h-6 w-6 text-primary" />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Player de Música</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ouça suas músicas favoritas diretamente do YouTube de forma legal e gratuita.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <MusicPlayer
              currentTrack={currentTrack}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isPlaying={isPlaying}
            />
            
            {currentTrack && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Reproduzindo agora</h3>
                <YouTubeEmbed 
                  videoId={currentTrack.youtubeId} 
                  autoplay={isPlaying}
                />
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Playlist</h3>
            <div className="space-y-3">
              {playlist.map((track) => (
                <PlaylistItem
                  key={track.id}
                  track={track}
                  isCurrentTrack={currentTrack?.id === track.id}
                  isPlaying={isPlaying && currentTrack?.id === track.id}
                  onSelect={handleTrackSelect}
                  onPlayPause={handlePlayPause}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;