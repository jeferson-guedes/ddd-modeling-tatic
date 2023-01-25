export default class Product {
    _id: string;
    _name: string;
    _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    get price(): number {
        return this._price;
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }

    validate(): boolean {
        if (this._id === undefined || this._id === null || this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._name === undefined || this._name === null || this._name.length === 0) {
            throw Error("Name is required");
        }
        if (this._price === undefined || this._price === null || this._price < 0) {
            throw Error("Price is required");
        }
        return true;
    }
}