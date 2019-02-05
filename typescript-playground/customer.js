"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id) {
        this.id = id;
        // const self = this;
        setTimeout(() => console.log(this.fooBar()), 2000);
    }
    fooBar() {
        // return 'Das ist Kunde\n' + this.id + '\nund er wohnt in München.';
        return `Das ist Kunde ${this.id} und er wohnt in München!`;
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map