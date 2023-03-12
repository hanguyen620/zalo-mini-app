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
import { createList, popularMusic } from "../state/models";

import { activePlaylist } from "../state/state";
import { musicApi } from "../state/store";

export default function Music() {
  const navigate = useNavigate();
  const mApi = musicApi();
  const [playList, setPlaylist] = useRecoilState(activePlaylist);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const [eplayList, setEplayList] = useState([]);
  const [recentPlay, setRecentPlay] = useState([]);
  const { openSnackbar } = useSnackbar();

  let defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiPKpwuXr5q-EQRWAIq8vq3zArQ90ZDL0zXw&usqp=CAU";

  useEffect(() => {
    fetchList();
    fetchRecently();
  }, []);

  function fetchRecently() {
    let list = mApi.getListRecently();
    if (list != null) {
      setRecentPlay(JSON.parse(list));
    }
  }

  function fetchList() {
    let list = mApi.getListLocal();
    if (list !== null) {
      setEplayList(JSON.parse(list));
    }
  }

  function addPlaylist() {
    if (playListName) {
      const newPlaylist = { title: `${playListName}`, list: [] };
      mApi.addListLocal([...eplayList, newPlaylist]);
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

  function playMusic(music) {
    if (recentPlay.find((rplay: popularMusic) => rplay?.id === music?.id)) {
      mApi.addListRecently([
        music,
        ...recentPlay.filter((rplay: popularMusic) => rplay?.id !== music?.id),
      ]);
    } else {
      mApi.addListRecently([music, ...recentPlay]);
    }
    setPlaylist(music);
    navigate(`/playmusic`);
    console.log(music.id);
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
              autoFocus
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
          {recentPlay.length ? (
            recentPlay.map((rPlay: popularMusic, i) => (
              <div
                className="flex px-2 py-2.5 items-start flex-col"
                key={i}
                onClick={() => playMusic(rPlay)}
              >
                <img
                  src={rPlay?.thumbnail}
                  style={{
                    borderRadius: "6px",
                    width: "180px",
                    height: "102px",
                  }}
                />
                <div style={{ width: "180px" }}>
                  <h3 className="text-base check-title">{rPlay?.title}</h3>
                  <span className="text-xs">{rPlay?.channelTitle}</span>
                </div>
              </div>
            ))
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  margin: "auto",
                  fontSize: "18px",
                }}
              >
                Chưa có bài hát nào gần đây
              </div>
            </>
          )}
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
              {eplayList.map((playlist: createList, i) => (
                <div
                  key={i}
                  className="flex py-1.5"
                  onClick={() => {
                    setPlaylist(playlist);
                    navigate(`/playlist`);
                    console.log(playlist);
                  }}
                >
                  <img
                    src={
                      playlist?.list[0]
                        ? playlist?.list[0].thumbnail
                        : defaultImage
                    }
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
