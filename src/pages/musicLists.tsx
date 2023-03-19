import React, { useEffect, useState } from "react";
import { Page, Icon } from "zmp-ui";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { hasSearchState, activeMusic } from "../state/state";
import SearchMusic from "../components/navSearch";
import { musicApi } from "../state/store";
import PlayMusic from "../components/playMusic";
import { popularMusic } from "../state/models";

export default function MusicLists() {
  const mApi = musicApi();
  const navigate = useNavigate();
  const [playMusic, setPlayMusic] = useRecoilState<popularMusic>(activeMusic);
  const { musicList } = mApi.musicStore();
  const [isSearch, setIsSearch] = useRecoilState(hasSearchState);
  const [recentPlay, setRecentPlay] = useState([]);

  useEffect(() => {
    fetchRecently();
  }, []);

  function fetchRecently() {
    let list = mApi.getListRecently();
    if (list != null) {
      setRecentPlay(JSON.parse(list));
    }
  }

  function playingMusic(music) {
    if (recentPlay.find((rplay: popularMusic) => rplay?.id === music?.id)) {
      mApi.addListRecently([
        music,
        ...recentPlay.filter((rplay: popularMusic) => rplay?.id !== music?.id),
      ]);
    } else {
      mApi.addListRecently([music, ...recentPlay]);
    }
    setPlayMusic(music);
    navigate(`/playmusic`);
    console.log(music);
  }

  return isSearch ? (
    <SearchMusic />
  ) : (
    <div style={{ width: "100%" }}>
      <div
        className="flex items-center justify-between px-2.5 pt-2.5"
        onClick={() => setIsSearch(true)}
      >
        <h1 className="text-2xl font-bold">Tìm kiếm</h1>
        <Icon icon="zi-search"></Icon>
      </div>
      <Page
        style={{
          marginTop: "10px",
        }}
      >
        <h1
          className="text-xl font-bold px-5"
          onClick={() => console.log(musicList)}
        >
          Thịnh hành tại Việt Nam
        </h1>
        {musicList.map((music, i) => (
          <div
            className="flex px-2.5 py-2.5 items-center"
            key={music.id}
            onClick={() => playingMusic(music)}
          >
            <p className="text-center px-2">
              #{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </p>
            <img
              src={music?.thumbnail}
              style={{
                width: "80px",
                height: "60px",
                marginRight: "10px",
                borderRadius: "6px",
              }}
            />
            <div>
              <h3 className="text-base check-title">{music?.title}</h3>
              <span className="text-xs">{music?.channelTitle}</span>
            </div>
          </div>
        ))}
      </Page>
    </div>
  );
}
