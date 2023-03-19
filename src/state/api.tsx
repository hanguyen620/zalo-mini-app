import React from "react";

const FetchData = () => {
  const key = "AIzaSyDzqNIjBx26NL3GBGDPiTqkxzsrqy8FhcA";
  const urlYoutube = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&regionCode=VN&videoCategoryId=10&key=${key}`;

  async function getTopMusic() {
    const response = await fetch(urlYoutube);
    const json = await response.json();
    const items = json.items.map((item, i) => ({
      id: i,
      mId: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
      channelTitle: item.snippet.channelTitle,
    }));
    return items;
  }

  async function searchMusic(value) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=${key}`
    );
    const json = await response.json();
    const items = json.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
      channelTitle: item.snippet.channelTitle,
    }));
    return items;
  }

  return {
    getTopMusic,
    searchMusic,
  };
};
export default FetchData;
