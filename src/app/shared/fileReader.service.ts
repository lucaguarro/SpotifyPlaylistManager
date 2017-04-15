import { SongSearchParams } from './song-search-params.model';

export class FileReaderService {
    read_file (event) {
    		var playlist = [];
    		var lines = event.target.result.split(/[\r\n]+/g);
    		for (var i = 0; i < lines.length; i++) {
    				var name   = lines[i].match(/.+,/g)[0];
    				var artist = lines[i].match(/,.+/g)[0];
    				if (name && artist) {
    						name   = name.slice(0, name.length-1).trim();
    						artist = artist.slice(1, artist.length).trim();
							playlist.push(new SongSearchParams(name, artist));
    				}
    		}
    		document.getElementById("output_1").innerHTML = JSON.stringify(playlist, null, 2);
    }
    
    load_files(event){
    		let file = event.target.files[0];
    		let reader = new FileReader();
    		
    		reader.readAsText(file);
    }
}