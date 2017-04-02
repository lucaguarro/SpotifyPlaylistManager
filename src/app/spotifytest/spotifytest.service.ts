import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifytestService {
  private url = 'https://api.spotify.com/v1/me';
  private headers : Headers;

  constructor(private http: Http) { }

  make_request(access_token : string): Promise<{}> {
      this.headers = new Headers({'Authorization': 'Bearer ' + access_token});
      return this.http
        .get(this.url, this.headers)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}