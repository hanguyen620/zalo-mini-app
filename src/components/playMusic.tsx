import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Icon, Page } from "zmp-ui";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";

import { popularMusic } from "../state/models";
import { hasMusicState } from "../state/state";

export default function PlayMusic() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [addMusic, setAddMusic] = useRecoilState<popularMusic[]>(hasMusicState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const videoUrl =
    "https://www.youtube.com/embed/jrramyuoqKQ?enablejsapi=1&controls=0&autoplay=1&mute=0&modestbranding=0&rel=0&vq=480";

  const togglePlay = () => {
    const video = videoRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"' +
        (isPlaying ? "playVideo" : "pauseVideo") +
        '","args":""}',
      "*"
    );
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value);
    videoRef.current?.contentWindow?.postMessage(
      `{"event":"command","func":"setVolume","args":[${newVolume}]}`,
      "*"
    );
    setVolume(newVolume);
  };

  return (
    <Page>
      <div className="flex flex-col justify-center items-center">
        <h3>title</h3>
        <span>singer</span>
      </div>
      <iframe
        width="100%"
        height="240px"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ref={videoRef}
      ></iframe>
      <div className="video-container">
        <div className="flex justify-center items-center py-6">
          <button>
            <AiOutlineStepBackward size={20} />
          </button>
          <button onClick={togglePlay} style={{ padding: "0 10px" }}>
            {isPlaying ? (
              <Icon icon="zi-play-solid" size={50} />
            ) : (
              <Icon icon="zi-pause-solid" size={50} />
            )}
          </button>
          <button>
            <AiOutlineStepForward size={20} />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button className="px-4">
            <FaVolumeMute style={{ fontSize: "20px" }} />
          </button>
          <input
            className="range"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
          <button className="px-4">
            <FaVolumeUp style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </Page>
  );
}
