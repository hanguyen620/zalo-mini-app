import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { popularMusic } from "../state/models";
import { hasMusicState } from "../state/state";

export default function PlayMusic() {
  const [addMusic, setAddMusic] = useRecoilState<popularMusic[]>(hasMusicState);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/watch?v=fyMgBQioTLo&vq=small";

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <audio src={videoUrl} controls={true} autoPlay={false} />
    </div>
  );
}
