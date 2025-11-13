import {DomainEvent} from "../../shared/domain.event";

export const CONSTRUCTION_SITE_CREATED = "constructionSiteCreated";

export class ConstructionSiteCreated implements DomainEvent {
    type = CONSTRUCTION_SITE_CREATED;
    aggregateId: string;
    payload: {
        id: string,
        title: string,
        startDate: string,
        endDate: string,
        location: string,
        creatorId: string
    };

    constructor(aggregateId: string, payload: { id: string, title: string, startDate: string, endDate: string, location: string, creatorId: string }) {
        this.aggregateId = aggregateId;
        this.payload = payload;
    }
}