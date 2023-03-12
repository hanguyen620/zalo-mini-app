import { atom } from "recoil";
import { popularMusic } from "./models";

export const hasSearchState = atom({
  key: "searchContact",
  default: false,
});

export const activePlaylist = atom<popularMusic | any>({
  key: "activePlaylist",
  default: null,
});
