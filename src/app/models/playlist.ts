import { Song } from "./song";
import { SongProviderEnum } from "./SongProviderEnum";
import { UserLogin } from "./userLogin";

export class Playlist {
    id!: number;
    name!: string;
    user!: UserLogin;
    songs!: Song[];

}
