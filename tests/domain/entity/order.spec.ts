import Order from "../../../src/domain/entity/order";
import OrderItem from "../../../src/domain/entity/order_item";

describe("Order unit test", () => {
    it("should throw when id is empty", () => {
        expect(() => {
            const order = new Order("", "123", []);
        }).toThrowError('Id is required');
    });

    it("should throw when customer_id is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError('CustomerId is required');
    });

    it("should throw when items is empty", () => {
        expect(() => {
            const order = new Order("123", "313", []);
        }).toThrowError('Items are required');
    });
    it("should calculate", () => {

        const item = new OrderItem("123", "abc", 100, 'p1', 2);
        const order = new Order("123", "123", [item]);
        const total = order.total();

        expect(total).toBe(200);
    });

    it("should calculate", () => {
        expect(() => {
            const order = new OrderItem('i1', 'Item 1', 100, 'p1', 0);
        }).toThrowError("Quantity must be greater than 0")
    });

})