import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Page, Input, Icon, Text } from "zmp-ui";

import { popularMusic } from "../state/models";
import { hasSearchState } from "../state/state";
import { MusicStore } from "../state/store";

export default function SearchMusic() {
  const [isSearch, setIsSearch] = useRecoilState(hasSearchState);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const { musicList } = MusicStore();

  const [musicName, setMusicName] = useState<popularMusic[]>([]);

  async function search(key: string) {
    try {
      if (!key) {
        setSearching(false);
      } else {
        const filteredByName = musicList.filter(
          (item: popularMusic) =>
            makeSearchText(item?.title).includes(key.toLowerCase()) == true
        );
        setMusicName(filteredByName);
      }
    } catch (e) {
      console.log("ERROR in search contact");
    }
    setTimeout(() => {
      setLoading(false);
      setSearching(false);
    }, 500);
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
        style={{ display: "flex", color: "white", background: "#ad68db" }}
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
            <div className="flex px-2 py-2.5 items-center" key={i}>
              <span className="text-center px-2">#{i + 1}</span>
              <img
                src={music?.thumbnail}
                style={{ width: "60px", height: "52px", marginRight: "10px" }}
              />
              <div>
                <h3 className="text-base">{music.title}</h3>
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
