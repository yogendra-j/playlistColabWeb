import { SongProviderEnum } from "./SongProviderEnum";

export class Song {
    title!: string;
    thumbnailUrlLow!: string;
    thumbnailUrlMedium!: string;
    videoId!: string;
    index!: number;
    songProvider: SongProviderEnum = SongProviderEnum.YOUTUBE;
    songQuery!: string;

}
