import React, { useRef, useState } from "react";
import { Page, Icon, Sheet, Box, Text, Button, Input } from "zmp-ui";

import { MusicStore } from "../state/store";

export default function Music() {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const sheetRef = useRef<any>(null);
  const { musicList } = MusicStore();

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
                onClick={() => setSheetVisible(false)}
              >
                Hủy
              </Button>
            </Box>
            <Box>
              <Button fullWidth onClick={() => setSheetVisible(false)}>
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
            <div className="flex px-2 py-2.5 items-start flex-col" key={i}>
              <img src={music.thumbnail} />
              <div style={{ width: "180px" }}>
                <h3 className="text-base">{music.title}</h3>
                <span className="text-xs">{music.channelTitle}</span>
              </div>
            </div>
          ))}
        </div>
        <Page>
          <div
            className="flex fixed justify-between px-4"
            style={{ width: "100%" }}
          >
            <h3 className="text-lg font-bold">Playlist cá nhân</h3>
            <Button
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
        </Page>
      </div>
    </>
  );
}
