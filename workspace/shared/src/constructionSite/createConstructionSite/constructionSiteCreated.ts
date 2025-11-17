import {Event} from "@workspace/shared/shared/event";

export const CONSTRUCTION_SITE_CREATED_EVENT_TYPE = "constructionSiteCreatedEventType";

export type ConstructionSiteCreated = Event & {
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
} ;

export const createConstructionSiteCreatedEvent = (aggregateId: string, payload: { id: string, title: string, startDate: string, endDate: string, location: string, creatorId: string }): ConstructionSiteCreated => {
    return {
        type: CONSTRUCTION_SITE_CREATED_EVENT_TYPE,
        aggregateId,
        payload
    }
}