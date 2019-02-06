import { $ } from 'protractor';

export class GoogleResultsPage {
    getResults() {
        const container = $('div#search');
        return container.$$('div.srg div.g');
    }

    getFirstResultHeadline() {
        return this.getResults()
            .first()
            .$('h3.LC20lb')
            .getText();
    }
}