import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;// outro agregado a gente faz uma relação fraca vinculando somente o id
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total()
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._customerId.length === 0) {
            throw new Error('CustomerId is required');
        }
        if (this._items.length === 0) {
            throw new Error('Items are required');
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw Error("Quantity must be greater than 0");
        }
        return true;
    }
    get id(): string {
        return this._id;
    }
    get customerId(): string {
        return this._customerId;
    }
    get items(): OrderItem[] {
        return this._items;
    }
    changeItems(items: OrderItem[]): void {
        this._items = items;
    }
    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }


}