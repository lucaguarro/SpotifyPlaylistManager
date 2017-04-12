export class Song {
    public title: string;
    public artist: string;
    public imagePath: string;
    //public uri: string;

    constructor(title: string, artist: string, imagePath: string){
        this.title = title;
        this.artist = artist;
        this.imagePath = imagePath;
        //this.uri = uri;
    }
}