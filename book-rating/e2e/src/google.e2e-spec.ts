import { GooglePage } from "./google.po";
import { browser } from 'protractor';


describe('Google', () => {

    // nicht auf Angular warten (nur für Nicht-Angular-Apps!)
    beforeAll(() => browser.waitForAngularEnabled(false));

    it('should have Wikipedia as the first result', () => {
        const headlineText = new GooglePage()
            .navigateTo()
            .search('Stachus')
            .getFirstResultHeadline();

        expect(headlineText).toContain('Wikipedia');
    });

    afterAll(() => browser.waitForAngularEnabled(true));

});