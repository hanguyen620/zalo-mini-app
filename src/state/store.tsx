import React, { useState, useEffect } from "react";

import { createList, popularMusic } from "./models";
import FetchData from "./api";

function musicApi() {
  function musicStore() {
    const mApi = FetchData();
    const [musicList, setMusicList] = useState<popularMusic[]>([]);

    useEffect(() => {
      mApi.getTopMusic().then((data) => {
        setMusicList(data);
      });
    }, []);
    return { musicList };
  }

  function getListLocal() {
    let value = localStorage.getItem("playlist");
    return value;
  }

  function addListLocal(value) {
    let result = localStorage.setItem("playlist", JSON.stringify(value));
    return result;
  }

  function getListRecently() {
    let value = localStorage.getItem("playRecently");
    return value;
  }

  function addListRecently(value) {
    let result = localStorage.setItem("playRecently", JSON.stringify(value));
    return result;
  }

  return {
    musicStore,
    getListLocal,
    addListLocal,
    getListRecently,
    addListRecently,
  };
}

export { musicApi };
