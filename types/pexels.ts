export type PexelsImage = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

export type VideoFile = {
  id: number;
  quality: "hd" | "sd";
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
};

export type PexelsVideo = {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: string | null;
  tags: string[];
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: VideoFile[];
  video_pictures: {
    id: number;
    picture: string;
    nr: number;
  }[];
};
