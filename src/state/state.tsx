import { atom } from "recoil";

export const hasSearchState = atom({
  key: "searchContact",
  default: false,
});

export const hasMusicState = atom({
  key: "addMusic",
  default: [],
});

export const activeContactState = atom({
  key: "activePlaylist",
  default: null,
});
