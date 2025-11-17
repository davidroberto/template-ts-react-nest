import {ConstructionSiteEventStoreRepository} from "@workspace/shared/constructionSite/constructionSiteEventStoreRepository";
import {ConstructionSiteEvent, fold} from "@workspace/shared/constructionSite/constructionSite";

export class ConstructionSiteInMemoryEventStoreRepository implements ConstructionSiteEventStoreRepository {

    private events: ConstructionSiteEvent[] = [];

    async append(event: ConstructionSiteEvent) {
        this.events.push(event);
    }

    async getEventsByAggregateId(aggregateId: string): Promise<ConstructionSiteEvent[]> {
        return this.events.filter(event => event.aggregateId === aggregateId);
    }

    async loadConstructionSite(aggregateId: string): Promise<any> {
        const events = await this.getEventsByAggregateId(aggregateId);
        return fold(events);

    }

}