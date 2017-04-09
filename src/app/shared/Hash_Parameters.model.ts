export class Hash_Parameters {
    access_token : string;
    state        : string;
    constructor(access_token, state) {
        this.access_token = access_token;
        this.state        = state;
    }
}