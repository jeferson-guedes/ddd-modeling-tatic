import Address from "./address";

export default class Customer {
    private readonly _id: string;
    private _name: string;
    private _active: boolean = false;
    private _address!: Address;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    private validate() {
        if (!this._id) {
            throw new Error('Invalid customer');
        }
        if (!this._name) {
            throw new Error('Invalid customer');
        }
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get rewardPoints(): number {
        return this._rewardPoints;
    }

    public get address(): Address {
        return this._address;
    }

    public desactive(): void {
        this._active = false;
    }

    public active(): void {
        if (this._address === undefined) {
            throw new Error("For activate need before vinculate address");
        }
        this._active = true;
    }

    public isActive(): boolean {
        return this._active;
    }

    public changeName(name: string) {
        this._name = name;
        this.validate();
    }

    public changeAddress(address: Address) {
        this._address = address;
        this._active = true;
    }

    public addRewardPoint(points: number) {
        this._rewardPoints += points;
    }
}