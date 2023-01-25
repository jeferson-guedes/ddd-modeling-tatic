import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerWasChangedAddressEvent from "../customer-was-changed-address-event";

export default class SendConsoleLogWhenCustomerChangedAddressHandler implements EventHandlerInterface<CustomerWasChangedAddressEvent> {
    handle(event: CustomerWasChangedAddressEvent): void {
        // tslint:disable-next-line:no-console
        console.log(`Endereço do cliente: ${event.eventData.id},
            ${event.eventData.name} alterado para: ${event.eventData.address.street}"`
        );
    }
}