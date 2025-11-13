import {DomainEvent} from "../../../shared/domain.event";
import {EventStoreRepository} from "../../../shared/eventStoreRepository";
import {hydrateConstructionSiteFromEvents} from "../../constructionSite.state";

export class InMemoryEventStoreRepository implements EventStoreRepository {

    private events: DomainEvent[] = [];

    async append(event: DomainEvent) {
        this.events.push(event);
    }

    async getEventsByAggregateId(aggregateId: string): Promise<DomainEvent[]> {
        return this.events.filter(event => event.aggregateId === aggregateId);
    }

    async loadAggregateFromEvents(aggregateId: string): Promise<any> {
        const events = await this.getEventsByAggregateId(aggregateId);
        return hydrateConstructionSiteFromEvents(events);

    }

}