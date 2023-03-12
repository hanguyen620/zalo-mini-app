import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Box,
  Button,
  Icon,
  Sheet,
  useNavigate,
  Text,
  Input,
  useSnackbar,
} from "zmp-ui";

import { createList, popularMusic } from "../state/models";
import { activePlaylist } from "../state/state";
import { musicApi } from "../state/store";

export default function PlayList() {
  const mApi = musicApi();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [editSheetVisible, setEditSheetVisible] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const [eplayList, setEplayList] = useState([]);
  const [playList, setPlaylist] = useRecoilState<createList>(activePlaylist);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  let defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiPKpwuXr5q-EQRWAIq8vq3zArQ90ZDL0zXw&usqp=CAU";

  useEffect(() => {
    fetchList();
  }, []);

  function fetchList() {
    let list = mApi.getListLocal();
    if (list !== null) {
      setEplayList(JSON.parse(list));
    }
  }

  function delPlaylist(list) {
    mApi.addListLocal([
      ...eplayList.filter((eplay: popularMusic) => eplay.title !== list.title),
    ]);
    openSnackbar({
      text: "Xóa Playlist thành công",
      type: "success",
      duration: 1500,
    });
    setSheetVisible(true);
    navigate(`/music`);
  }

  function editPlaylist(list) {
    if (playListName) {
      const newPlaylist = { title: `${playListName}`, list: list.list };
      mApi.addListLocal([
        ...eplayList.filter(
          (eplay: popularMusic) => eplay.title !== list.title
        ),
        newPlaylist,
      ]);
      openSnackbar({
        text: "chỉnh sửa thành công",
        type: "success",
        duration: 1500,
      });
      setPlaylist(newPlaylist);
      setEditSheetVisible(false);
      navigate(`/playlist`);
    } else {
      openSnackbar({
        text: "Vui lòng nhập tên Playlist",
        type: "error",
        duration: 1500,
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center px-3.5 py-3 relative">
      <div style={{ width: "90px" }} className="mb-2.5">
        <img src={defaultImage} style={{ borderRadius: "10px" }} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold">{playList.title}</h3>
        <p className="pb-2.5">
          {playList?.list ? playList.list.length : 0} bài hát
        </p>
        {playList?.list.length ? (
          ""
        ) : (
          <p style={{ textAlign: "center" }}>
            Sắp xếp các bài hát vào playlist bằng cách tìm kiếm và thêm chúng
            vào Music pro
          </p>
        )}
        <Button
          onClick={() => {
            console.log(playList);
            navigate(`/search`);
          }}
        >
          Tìm kiếm bài
        </Button>
      </div>
      <div className="mt-5">
        {playList?.list.length ? (
          playList.list.map((pList: popularMusic, i) => (
            <div key={i} className="flex pb-5">
              <img
                src={pList?.thumbnail}
                style={{
                  width: "60px",
                  height: "52px",
                  marginRight: "10px",
                  borderRadius: "6px",
                }}
              />
              <div>
                <h3 className="text-base check-title">{pList?.title}</h3>
                <span className="text-xs">{pList?.channelTitle}</span>
              </div>
              <button>
                <Icon icon="zi-more-vert"></Icon>
              </button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div
        className="absolute top-3 right-2.5 rounded-xl"
        style={{ backgroundColor: "#818183" }}
      >
        <button onClick={() => setSheetVisible(true)}>
          <Icon icon="zi-more-vert"></Icon>
        </button>
        <Sheet.Actions
          visible={sheetVisible}
          title="Chọn"
          onClose={() => setSheetVisible(false)}
          actions={[
            [
              {
                text: "Chỉnh sửa",
                onClick: () => {
                  setSheetVisible(false);
                  setTimeout(() => {
                    setPlayListName(playList.title);
                    setEditSheetVisible(true);
                  }, 200);
                },
              },
              {
                text: "Xóa",
                onClick: () => {
                  delPlaylist(playList);
                },
                danger: true,
                close: true,
              },
            ],
            [{ text: "Hủy", close: true }],
          ]}
        />
        <Sheet
          visible={editSheetVisible}
          onClose={() => setEditSheetVisible(false)}
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
                  }}
                >
                  Hủy
                </Button>
              </Box>
              <Box>
                <Button
                  fullWidth
                  onClick={() => {
                    editPlaylist(playList);
                  }}
                >
                  Cập nhật
                </Button>
              </Box>
            </Box>
          </Box>
        </Sheet>
      </div>
    </div>
  );
}
