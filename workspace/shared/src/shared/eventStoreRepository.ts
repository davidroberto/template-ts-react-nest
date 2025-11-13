import {DomainEvent} from "./domain.event";

export interface EventStoreRepository {
    append(event: DomainEvent): Promise<void>;
    loadAggregateFromEvents(aggregateId: string): Promise<any>;
}