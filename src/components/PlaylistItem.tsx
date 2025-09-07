import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { Track } from "./MusicPlayer";

interface PlaylistItemProps {
  track: Track;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onSelect: (track: Track) => void;
  onPlayPause: () => void;
}

export const PlaylistItem = ({ 
  track, 
  isCurrentTrack, 
  isPlaying, 
  onSelect, 
  onPlayPause 
}: PlaylistItemProps) => {
  const handleClick = () => {
    if (isCurrentTrack) {
      onPlayPause();
    } else {
      onSelect(track);
    }
  };

  return (
    <Card className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
      isCurrentTrack ? 'bg-accent border-primary' : ''
    }`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={track.thumbnail}
            alt={track.title}
            className="w-12 h-12 rounded object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-0 bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity"
            onClick={handleClick}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex-1 min-w-0" onClick={handleClick}>
          <h4 className={`font-medium truncate ${
            isCurrentTrack ? 'text-primary' : ''
          }`}>
            {track.title}
          </h4>
          <p className="text-sm text-muted-foreground truncate">
            {track.artist} • {track.duration}
          </p>
        </div>
      </div>
    </Card>
  );
};