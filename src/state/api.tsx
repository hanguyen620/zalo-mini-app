import React from "react";

const FetchData = () => {
  const key = "AIzaSyDzqNIjBx26NL3GBGDPiTqkxzsrqy8FhcA";
  const urlYoutube = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&regionCode=VN&videoCategoryId=10&key=${key}`;
  const urlShazam =
    "https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0";

  async function getTopMusic() {
    const response = await fetch(urlYoutube);
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

  async function getShazam() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bfaf978b9cmshffe417df2c6470bp1573f9jsnb5b2733a3940",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };
    const response = await fetch(urlShazam, options);
    const json = await response.json();
    // const items = json.event.map((item) => ({
    //   id: item.key,
    //   title: item.title,
    //   subtitle: item.subtitle,
    //   images: item.images,
    //   actions: item.actions,
    // }));
    return json;
  }

  return {
    getTopMusic,
    getShazam,
  };
};
export default FetchData;
