export interface popularMusic {
  mId: string;
  channelTitle: string;
  id: string;
  thumbnail: string;
  title: string;
  videoUrl: string;
}

export interface shazamMusic {
  id: string;
  title: string;
  subtitle: string;
  images: [];
  actions: [];
}

export interface createList {
  title: string;
  list: popularMusic[];
}
