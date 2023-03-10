import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  Page,
  Icon,
  Sheet,
  Box,
  Text,
  Button,
  Input,
  List,
  useSnackbar,
} from "zmp-ui";

import { activeContactState } from "../state/state";
import { musicApi } from "../state/store";

export default function Music() {
  const navigate = useNavigate();
  const music = musicApi();
  const [playList, setPlaylist] = useRecoilState(activeContactState);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const [eplayList, setEplayList] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { musicList } = music.musicStore();

  let defaultImage =
    "https://play-lh.googleusercontent.com/54v1qfGwv6CsspWLRjCUEfVwg4UX248awdm_ad7eoHFst6pDwPNgWlBb4lRsAbjZhA=w240-h480-rw";

  useEffect(() => {
    fetchList();
  }, []);

  function fetchList() {
    let list = music.getListLocal();
    if (list !== null) {
      setEplayList(JSON.parse(list));
    }
  }

  function addPlaylist() {
    if (playListName) {
      const newPlaylist = { title: `${playListName}`, list: [] };
      music.addListLocal([...eplayList, newPlaylist]);
      openSnackbar({
        text: "Thêm Playlist thành công",
        type: "success",
        duration: 1500,
      });
      setPlayListName("");
      fetchList();
    } else {
      openSnackbar({
        text: "Vui lòng nhập tên Playlist",
        type: "error",
        duration: 1500,
      });
    }
  }

  return (
    <>
      <Sheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        autoHeight
        mask
        handler
        swipeToClose
        defaultSnapPoint={2}
        onSnap={(nap) => {
          console.log("current point", nap);
        }}
      >
        <Box flexDirection="column">
          <Box>
            <Text.Title className="text-center">Thêm Playlist mới</Text.Title>
          </Box>
          <Box>
            <Input
              clearable
              type="text"
              value={playListName}
              onChange={(e) => setPlayListName(e.target.value)}
              label="Tên Playlist"
            />
          </Box>
          <Box flexDirection="row">
            <Box>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  // localStorage.clear();
                  setSheetVisible(false);
                  console.log(eplayList);
                }}
              >
                Hủy
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                onClick={() => {
                  addPlaylist();
                  setSheetVisible(false);
                }}
              >
                Tạo
              </Button>
            </Box>
          </Box>
        </Box>
      </Sheet>

      <div className="flex flex-col" style={{ overflow: "hidden" }}>
        <h1 className="text-2xl px-2.5 pt-2.5 font-bold">Playlist</h1>
        <h3 className="text-xl font-bold px-5 mt-2.5">Play gần đây</h3>
        <div
          style={{
            display: "flex",
            overflow: "auto",
            height: "210px",
            marginTop: "10px",
          }}
          className="no-scrollbar"
        >
          {musicList.map((music, i) => (
            <div
              className="flex px-2 py-2.5 items-start flex-col"
              key={i}
              onClick={() => {
                navigate(`/playmusic`);
              }}
            >
              <img src={music.thumbnail} style={{ borderRadius: "6px" }} />
              <div style={{ width: "180px" }}>
                <h3 className="text-base check-title">{music.title}</h3>
                <span className="text-xs">{music.channelTitle}</span>
              </div>
            </div>
          ))}
        </div>
        <Page>
          <div
            className="flex justify-between px-4 py-2"
            style={{ width: "100%" }}
          >
            <h3 className="text-lg font-bold">Playlist cá nhân</h3>
            <Button
              variant="secondary"
              onClick={() => setSheetVisible(true)}
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                width: "30px",
                height: "30px",
              }}
              icon={<Icon icon="zi-plus"></Icon>}
            ></Button>
          </div>
          {eplayList.length ? (
            <Page className="px-2.5">
              {eplayList.map((playlist, i) => (
                <div
                  key={i}
                  className="flex py-1.5"
                  onClick={() => {
                    setPlaylist(playlist);
                    navigate(`/playlist`);
                  }}
                >
                  <img
                    src={playlist?.list[0] || defaultImage}
                    style={{
                      width: "60px",
                      height: "52px",
                      marginRight: "10px",
                      borderRadius: "6px",
                    }}
                  />
                  <div>
                    <h3>{playlist?.title}</h3>
                    <span>{playlist?.list.length} bài hát</span>
                  </div>
                </div>
              ))}
            </Page>
          ) : (
            ""
          )}
        </Page>
      </div>
    </>
  );
}
