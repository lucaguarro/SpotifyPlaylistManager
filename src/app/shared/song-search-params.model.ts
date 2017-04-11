export class SongSearchParams {
    public title: string;
    public artist: string;

    constructor(title: string, artist: string){
        this.title = title;
        this.artist = artist;
    }
}