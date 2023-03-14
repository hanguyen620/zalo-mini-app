import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Page, Input, Icon, Text, useNavigate } from "zmp-ui";

import { popularMusic } from "../state/models";
import { activeMusic, hasSearchState } from "../state/state";
import { musicApi } from "../state/store";
import FetchData from "../state/api";

export default function SearchMusic() {
  const navigate = useNavigate();
  const [playMusic, setPlayMusic] = useRecoilState(activeMusic);
  const mApi = musicApi();
  const fecthData = FetchData();
  const [isSearch, setIsSearch] = useRecoilState(hasSearchState);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentPlay, setRecentPlay] = useState([]);
  const { musicList } = mApi.musicStore();

  const [musicName, setMusicName] = useState<popularMusic[]>([]);

  useEffect(() => {
    fetchRecently();
  }, []);

  function fetchRecently() {
    let list = mApi.getListRecently();
    if (list != null) {
      setRecentPlay(JSON.parse(list));
    }
  }

  async function search(key: string) {
    try {
      if (!key) {
        setSearching(false);
      } else {
        // const filteredByName = musicList.filter(
        //   (item: popularMusic) =>
        //     makeSearchText(item?.title).includes(key.toLowerCase()) == true
        // );
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${key}&type=video&key=AIzaSyDzqNIjBx26NL3GBGDPiTqkxzsrqy8FhcA`
        );
        const json = await response.json();
        const items = json.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
          channelTitle: item.snippet.channelTitle,
        }));
        setMusicName(items);
      }
    } catch (e) {
      console.log("ERROR in search music");
    }
    setTimeout(() => {
      setLoading(false);
      setSearching(false);
    }, 1000);
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
    console.log(music.id);
  }

  function makeSearchText(str: string) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  return (
    <Page className="fixed">
      <Box
        className="items-center justify-center"
        style={{
          display: "flex",
          color: "white",
          background: "#ad68db",
        }}
      >
        <Input.Search
          label="Label"
          helperText="Helper text"
          loading={searching}
          clearable
          autoFocus
          onSearch={(text) => {
            console.log(text);
            setLoading(true);
            setSearching(true);
            search(text);
          }}
          className="input-search"
          style={{ border: "none" }}
        />
        <div className="ml-4" onClick={() => setIsSearch(false)}>
          Đóng
        </div>
      </Box>
      {loading ? (
        <Text className="text-center mt-4">Đang tìm kiếm ...</Text>
      ) : musicName?.length ? (
        <>
          {musicName.map((music, i) => (
            <div
              className="flex px-4 py-2.5 items-center"
              key={i}
              onClick={() => {
                playingMusic(music);
              }}
            >
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
                <h3 className="text-base check-title">{music.title}</h3>
                <span className="text-xs">{music.channelTitle}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Text className="text-center mt-4">Không tìm thấy</Text>
      )}
    </Page>
  );
}
