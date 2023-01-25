import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../database/sequelize/model/order.model";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order_item";
import ProductModel from "../database/sequelize/model/product.model";
import {or} from "sequelize";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                orderId: entity.id
            }))
        }, {
            include: [{model: OrderItemModel}]
        })
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({where: {id}, include: ['items']});
        const items = orderModel.items.map((orderItemModel) => {
            return new OrderItem(
                orderItemModel.id,
                orderItemModel.name,
                orderItemModel.price,
                orderItemModel.productId,
                orderItemModel.quantity
            )
        })
        return new Order(orderModel.id, orderModel.customerId, items)
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({include: ['items']});

        return ordersModel.map((orderModel) => {
            const items = orderModel.items.map((orderItemModel) => {
                return new OrderItem(
                    orderItemModel.id,
                    orderItemModel.name,
                    orderItemModel.price,
                    orderItemModel.productId,
                    orderItemModel.quantity
                )
            })
            return new Order(orderModel.id, orderModel.customerId, items)
        })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customerId: entity.customerId,
            total: entity.total(),
        }, {
            where: {
                id: entity.id
            }
        })
        entity.items.map(async (orderItem) => {
            await OrderItemModel.upsert({
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                productId: orderItem.productId,
                orderId: entity.id
            })
        });
    }

}