import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export interface Track {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: string;
  thumbnail: string;
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isPlaying: boolean;
}

export const MusicPlayer = ({ 
  currentTrack, 
  onPlayPause, 
  onNext, 
  onPrevious, 
  isPlaying 
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState([70]);

  if (!currentTrack) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <div className="text-center text-muted-foreground">
          <p>Selecione uma música para começar</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{currentTrack.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button variant="default" size="icon" onClick={onPlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onNext}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 w-24">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </Card>
  );
};