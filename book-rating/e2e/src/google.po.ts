import { browser, $ } from 'protractor';
import { GoogleResultsPage } from './google-results.po';

export class GooglePage {
    navigateTo() {
        browser.get('https://www.google.de');
        return this;
    }

    search(term: string) {
        // Textfeld finden
        const form = $('form#tsf');
        const input = form.$('input.gLFyf');

        // Begriff eingeben
        input.sendKeys(term);

        // Formular abschicken
        form.submit();

        return new GoogleResultsPage();
    }
}