import { PlaylistManagerPage } from './app.po';

describe('playlist-manager App', () => {
  let page: PlaylistManagerPage;

  beforeEach(() => {
    page = new PlaylistManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
