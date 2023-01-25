import EventDispatcher from "../../../../src/domain/event/@shared/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler
    from "../../../../src/domain/event/product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../../../src/domain/event/product/product-created.event";
import SendConsoleLogOneCreatedCustomerHandler
    from "../../../../src/domain/event/customer/handler/send-console-log-one-created-customer.handler";
import SendConsoleLogTwoCreatedCustomerHandler
    from "../../../../src/domain/event/customer/handler/send-console-log-two-created-customer.handler";
import CustomerRepository from "../../../../src/infrastruture/repository/customer.repository";
import Customer from "../../../../src/domain/entity/customer";
import Address from "../../../../src/domain/entity/address";
import CustomerModel from "../../../../src/infrastruture/database/sequelize/model/customer.model";
import CustomerCreatedEvent from "../../../../src/domain/event/customer/customer-created-event";
import {Sequelize} from "sequelize-typescript";

describe("Domain events tests", () => {

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

    it("should register event handler on created customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLogOneCreatedCustomerHandler();
        const eventHandler2 = new SendConsoleLogTwoCreatedCustomerHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(2);
    });
    it("should register event handler on created customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLogOneCreatedCustomerHandler();
        const eventHandler2 = new SendConsoleLogTwoCreatedCustomerHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(2);

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.notify(new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            address
        }));
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })
    it("should register event handler when was change customer adrees", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 13, "01001000", "BH");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLogOneCreatedCustomerHandler();
        const eventHandler2 = new SendConsoleLogTwoCreatedCustomerHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(2);

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.notify(new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            address
        }));
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

})