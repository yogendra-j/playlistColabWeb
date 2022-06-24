import { Song } from "./song";
import { UserLogin } from "./userLogin";

export class Playlist {
    id!: number;
    name!: string;
    user!: UserLogin;
    songs!: Song[];

}