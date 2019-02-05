export class Customer {

    constructor(private id: number) {

        // const self = this;
        setTimeout(() => console.log(this.fooBar()), 2000);
    }

    fooBar(): string {
        // return 'Das ist Kunde\n' + this.id + '\nund er wohnt in München.';
        return `Das ist Kunde ${this.id} und er wohnt in München!`;
    }
}