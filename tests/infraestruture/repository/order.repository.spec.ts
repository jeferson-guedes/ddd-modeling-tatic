import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../src/infrastruture/database/sequelize/model/customer.model";
import OrderModel from "../../../src/infrastruture/database/sequelize/model/order.model";
import OrderItemModel from "../../../src/infrastruture/database/sequelize/model/order-item.model";
import ProductModel from "../../../src/infrastruture/database/sequelize/model/product.model";
import CustomerRepository from "../../../src/infrastruture/repository/customer.repository";
import Customer from "../../../src/domain/entity/customer";
import Address from "../../../src/domain/entity/address";
import ProductRepository from "../../../src/infrastruture/repository/product.repository";
import Product from "../../../src/domain/entity/product";
import OrderRepository from "../../../src/infrastruture/repository/order.repository";
import OrderItem from "../../../src/domain/entity/order_item";
import Order from "../../../src/domain/entity/order";

describe("Order repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "customer 1");
        const address = new Address("street 1", 123, "0100000", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("o_i1", product.name, product.price, product.id, 2);
        const order = new Order("o1", customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    orderId: order.id,
                    productId: orderItem.productId,
                }
            ]
        })
    });

    it("should update a name order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "customer 1");
        const address = new Address("street 1", 123, "0100000", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("o_i1", product.name, product.price, product.id, 2);
        const order = new Order("o1", customer.id, [orderItem]);

        await orderRepository.create(order);

        const product2 = new Product("p2", "product 2", 100);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem("o_i2", product.name, product.price, product.id, 2);

        order.changeItems([orderItem, orderItem2]);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});
        const totalModel = orderModel.total;

        expect(order.total()).toEqual(totalModel);
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    orderId: order.id,
                    productId: orderItem.productId,
                }, {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    orderId: order.id,
                    productId: orderItem2.productId,
                }
            ]
        })
    });

    it("should find order with id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "customer 1");
        const address = new Address("street 1", 123, "0100000", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("o_i1", product.name, product.price, product.id, 2);
        const order = new Order("o1", customer.id, [orderItem]);

        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]})
        const foundOrder = await orderRepository.find("o1");

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customerId: foundOrder.customerId,
            total: foundOrder.total(),
            items: foundOrder.items.map(_ => ({
                id: _.id,
                name: _.name,
                quantity: _.quantity,
                price: _.price,
                productId: _.productId,
                orderId: foundOrder.id
            }))
        })
    });
    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "customer 1");
        const address = new Address("street 1", 123, "0100000", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "product 1", 100);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("o_i1", product.name, product.price, product.id, 2);
        const order = new Order("o1", customer.id, [orderItem]);

        await orderRepository.create(order);
        const ordersModel = await OrderModel.findAll({include: ["items"]})

        const foundOrders = await orderRepository.findAll();

        const orders = foundOrders.map((foundOrder) => {
            return {
                id: foundOrder.id,
                customerId: foundOrder.customerId,
                total: foundOrder.total(),
                items: foundOrder.items.map(_ => ({
                    id: _.id,
                    name: _.name,
                    quantity: _.quantity,
                    price: _.price,
                    productId: _.productId,
                    orderId: foundOrder.id
                }))
            }
        });
        const ordersModelToJson = ordersModel.map(record => record.toJSON());
        expect(ordersModelToJson).toStrictEqual(orders)
    });

});