import { Cp317FrontendPage } from './app.po';

describe('cp317-frontend App', () => {
  let page: Cp317FrontendPage;

  beforeEach(() => {
    page = new Cp317FrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
