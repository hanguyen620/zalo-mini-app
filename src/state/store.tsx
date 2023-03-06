import React, { useState, useEffect } from "react";

import { popularMusic } from "./models";
import FetchData from "./api";

export function MusicStore() {
  const mApi = FetchData();
  const [musicList, setMusicList] = useState<popularMusic[]>([]);

  useEffect(() => {
    mApi.getTopMusic().then((data) => {
      setMusicList(data);
    });
  }, []);
  return { musicList };
}

export function ShazamStore() {
  const mApi = FetchData();
  const [shazamList, setShazamList] = useState<popularMusic[]>([]);

  useEffect(() => {
    mApi.getShazam().then((data) => {
      setShazamList(data);
    });
  }, []);
  return { shazamList };
}
