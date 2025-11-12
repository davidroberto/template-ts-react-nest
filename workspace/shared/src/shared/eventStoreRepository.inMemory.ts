import {EventStoreRepository} from "../constructionSite/eventStoreRepository";
import {DomainEvent} from "./domainEvent";

export class InMemoryEventStoreRepository implements EventStoreRepository {

    private events: DomainEvent[] = [];

    async append(event: DomainEvent) {
        this.events.push(event);
    }

    async getEventsByAggregateId(aggregateId: string): Promise<DomainEvent[]> {
        return this.events.filter(event => event.aggregateId === aggregateId);
    }

}