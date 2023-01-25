import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created-event";

export default class SendConsoleLogTwoCreatedCustomerHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        // tslint:disable-next-line:no-console
        console.log(`Esse é o segundo console.log do evento: CustomerCreated"`);
    }
}