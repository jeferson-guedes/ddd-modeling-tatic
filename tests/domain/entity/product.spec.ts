import Product from "../../../src/domain/entity/product";

describe("Product unit test", () => {
    it("should throw when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product", 100);
        }).toThrowError('Id is required');
    });
    it("should throw when name is empty", () => {
        expect(() => {
            const product = new Product("p1", "", 100);
        }).toThrowError('Name is required');
    });
    it("should throw when price is empty", () => {
        expect(() => {
            const product = new Product("123", "313", -1);
        }).toThrowError('Price is required');
    });
    it("should change name", () => {
        const product = new Product("123", "313", 100);
        product.changeName('Product 2');
        expect(product.name).toBe("Product 2")
    });
    it("should change price", () => {
        const product = new Product("123", "313", 100);
        product.changePrice(150);
        expect(product.price).toBe(150)
    });
})