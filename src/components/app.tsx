import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import Music from "../pages/music";
import Infor from "../pages/infor";
import MusicLists from "../pages/musicLists";
import NavFooter from "./navFooter";
import Language from "../pages/language";
import Nation from "../pages/nation";
import Popular from "../pages/popular";
import PlayMusic from "../pages/playMusic";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<Music></Music>}></Route>
              <Route path="/music" element={<Music></Music>}></Route>
              <Route path="/search" element={<MusicLists></MusicLists>}></Route>
              <Route path="/infor" element={<Infor></Infor>}></Route>
              <Route
                path="/infor/language"
                element={<Language></Language>}
              ></Route>
              <Route path="/infor/nation" element={<Nation></Nation>}></Route>
              <Route
                path="/infor/popular"
                element={<Popular></Popular>}
              ></Route>
              <Route
                path="/playmusic"
                element={<PlayMusic></PlayMusic>}
              ></Route>
            </AnimationRoutes>
            <NavFooter />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
