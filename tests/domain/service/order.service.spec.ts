import Customer from "../../../src/domain/entity/customer";
import OrderItem from "../../../src/domain/entity/order_item";
import OrderService from "../../../src/domain/service/order.service";
import Order from "../../../src/domain/entity/order";

describe("Order service unit test", () => {
    it ("should place an order", () =>  {
        const customer = new Customer('c1', 'customer 1');
        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1])
        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)

    });

    it("should get total of all orders", () => {
        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        const item3 = new OrderItem("i3", "Item 3", 300, "p3", 3);

        const order1 = new Order("o1", "c1", [item1, item2]);
        const order2 = new Order("o2", "c1", [item1, item2, item3]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(1900);
    });
});