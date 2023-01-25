import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../database/sequelize/model/customer.model";
import Address from "../../domain/entity/address";
import EventDispatcher from "../../domain/event/@shared/event-dispatcher";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id
                },
                rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("Customer not found ")
        }

        const customer = new Customer(id, customerModel.name);

        // @ts-ignore
        const address = new Address(customerModel.street, customerModel.number, customerModel.zip, customerModel.city);
        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoint(customerModel.rewardPoints)
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zip,
                customerModel.city,
            )
            customer.changeAddress(address);
            return customer;
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive(),
                reward: entity.rewardPoints,
            }, {
                where: {
                    id: entity.id
                }
            }
        );
    }

}