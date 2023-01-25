export default class Address {
    _street: string;
    _number: number;
    _zip: string;
    _city: string;

    // tslint:disable-next-line:variable-name
    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    private validate(): boolean {
        if (!this._street) {
            throw new Error('Street is required');
        }
        if (!this._number) {
            throw new Error('Number is required');
        }
        if (!this._zip) {
            throw new Error('Zip is required');
        }
        if (!this._city) {
            throw new Error('City is required');
        }
        return true;
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }
}