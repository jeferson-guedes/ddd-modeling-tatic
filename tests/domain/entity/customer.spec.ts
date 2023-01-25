import Customer from "../../../src/domain/entity/customer";
import Address from "../../../src/domain/entity/address";

describe("Customer unit test", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "Jonh");
        }).toThrowError('Invalid customer');
    });
    it("should change name", () => {
        // Arrange
        const customer = new Customer("123", "Jonh");
        // Act
        customer.changeName("Jane");
        // Assert
        expect(customer.name).toBe("Jane");
    });

    it("should change name", () => {
        // Arrange
        const customer = new Customer("123", "Jonh");
        const address = new Address("rua 1", 1, "BH", "BH");
        customer.changeAddress(address);

        expect(customer.isActive()).toBe(true);

    });

    it("should add reward points ", () => {
        const customer = new Customer("1", "Customer 1")
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoint(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoint(10)
        expect(customer.rewardPoints).toBe(20)

    })
})