import React, { useEffect, useState } from "react";
import { Page, Icon } from "zmp-ui";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { hasSearchState, hasMusicState } from "../state/state";
import SearchMusic from "../components/navSearch";
import { musicApi } from "../state/store";
import PlayMusic from "../components/playMusic";
import { popularMusic } from "../state/models";

export default function MusicLists() {
  const music = musicApi();
  const navigate = useNavigate();
  const { musicList } = music.musicStore();
  const [isSearch, setIsSearch] = useRecoilState(hasSearchState);
  const [addMusic, setAddMusic] = useRecoilState<popularMusic[]>(hasMusicState);

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
            className="flex px-2 py-2.5 items-center"
            key={music.id}
            onClick={() => {
              console.log(music.id);
              navigate(`/playmusic`);
            }}
          >
            <span className="text-center px-2">#{i + 1}</span>
            <img
              src={music?.thumbnail}
              style={{
                width: "60px",
                height: "52px",
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
