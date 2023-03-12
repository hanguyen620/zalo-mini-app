import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  Box,
  Icon,
  Page,
  Sheet,
  Text,
  Button,
  useSnackbar,
  Input,
} from "zmp-ui";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";

import { musicApi } from "../state/store";
import { createList, popularMusic } from "../state/models";
import { activePlaylist } from "../state/state";

export default function PlayMusic() {
  const mApi = musicApi();
  const { openSnackbar } = useSnackbar();
  const [playList, setPlaylist] = useRecoilState<popularMusic>(activePlaylist);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [editSheetVisible, setEditSheetVisible] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [eplayList, setEplayList] = useState([]);
  const [volume, setVolume] = useState(50);

  const videoUrl = `https://www.youtube.com/embed/${playList?.id}?enablejsapi=1&controls=0&autoplay=1&mute=0&modestbranding=0&rel=0&vq=480`;

  useEffect(() => {
    fetchList();
  }, []);

  function fetchList() {
    let list = mApi.getListLocal();
    if (list !== null) {
      setEplayList(JSON.parse(list));
    }
  }

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

  function addMusic(eplay) {
    eplay.list.push(playList);
    mApi.addListLocal([
      ...eplayList.filter(
        (newEplay: createList) => newEplay.title !== eplay.title
      ),
      eplay,
    ]);
    setEditSheetVisible(false);
    openSnackbar({
      text: `Đã thêm vào PlayList`,
      type: "success",
      duration: 1500,
    });
  }

  return (
    <>
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
        <Box>
          <Box flex>
            <h3 style={{ color: "#333", flex: "4", margin: "auto" }}>
              {" "}
              Thêm vào Playlist
            </h3>
            <button
              style={{ color: "#333", flex: "1" }}
              onClick={() => setEditSheetVisible(false)}
            >
              Hủy
            </button>
          </Box>
          <Box>
            {eplayList.length
              ? eplayList.map((eplay: createList, i) => (
                  <Box key={i}>
                    <Button
                      fullWidth
                      variant="secondary"
                      onClick={() => addMusic(eplay)}
                    >
                      {eplay?.title}
                    </Button>
                  </Box>
                ))
              : ""}
            <Box>
              <Button fullWidth onClick={() => setSheetVisible(true)}>
                Thêm Playlist
              </Button>
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Sheet>
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
      <Sheet.Actions />
      <Page style={{ height: "100%" }}>
        <div className="flex">
          <button style={{ flex: "1" }}>
            <Icon icon="zi-chevron-down"></Icon>
          </button>
          <div
            className="flex flex-col justify-center items-center"
            style={{ flex: "9", overflow: "hidden" }}
          >
            <h3 className="marquee">{playList?.title}</h3>
            <span>{playList?.channelTitle}</span>
          </div>
          <button
            style={{ flex: "1" }}
            onClick={() => {
              console.log(123);
              setEditSheetVisible(true);
            }}
          >
            <Icon icon="zi-more-vert"></Icon>
          </button>
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
    </>
  );
}
