export class Song {
    public title: string;
    public artist: string;
    public imagePath: string;
    public spotifyID: string;

    constructor(title: string, artist: string, imagePath: string, spotifyID: string){
        this.title = title;
        this.artist = artist;
        this.imagePath = imagePath;
        this.spotifyID = spotifyID;
    }
}