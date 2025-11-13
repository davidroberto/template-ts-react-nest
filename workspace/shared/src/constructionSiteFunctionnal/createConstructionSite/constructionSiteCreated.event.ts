import {DomainEvent} from "../../shared/domain.event";

export const CONSTRUCTION_SITE_CREATED_EVENT_TYPE = "constructionSiteCreatedEventType";

export type ConstructionSiteCreatedEvent = DomainEvent & {
    type: typeof CONSTRUCTION_SITE_CREATED_EVENT_TYPE;
    aggregateId: string;
    payload: {
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        location: string;
        creatorId: string;
    };
}

export const createConstructionSiteCreatedEvent = (aggregateId: string, payload: { id: string, title: string, startDate: string, endDate: string, location: string, creatorId: string }): ConstructionSiteCreatedEvent => {
    return {
        type: CONSTRUCTION_SITE_CREATED_EVENT_TYPE,
        aggregateId,
        payload
    }
}