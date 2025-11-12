import {DomainEvent} from "../shared/domainEvent";

export interface EventStoreRepository {
    append(event: DomainEvent): Promise<void>;
}