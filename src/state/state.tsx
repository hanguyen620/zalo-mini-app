import { atom } from "recoil";
import { popularMusic } from "./models";

export const hasSearchState = atom({
  key: "searchContact",
  default: false,
});

export const activeMusic = atom<popularMusic | any>({
  key: "activeMusic",
  default: null,
});

export const activePlaylist = atom<popularMusic | any>({
  key: "activePlaylist",
  default: null,
});
