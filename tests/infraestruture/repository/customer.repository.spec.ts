import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../src/infrastruture/database/sequelize/model/customer.model";
import CustomerRepository from "../../../src/infrastruture/repository/customer.repository";
import Customer from "../../../src/domain/entity/customer";
import Address from "../../../src/domain/entity/address";

describe("Customer repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
        });
    });

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository ();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer.changeAddress(address);
        await customerRepository.create(customer);


        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
        });
    });

    it("should find customer with id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerEntity = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerEntity)
    });
    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        await expect(async () => {
            await customerRepository.find("ABC134");
        }).rejects.toThrowError("Customer not found")
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer1.changeAddress(address);
        customer1.addRewardPoint(10);
        customer1.active();

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("rua 1", 13, "01001000", "BH");
        customer2.changeAddress(address2);
        customer2.addRewardPoint(10);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);

    });
});