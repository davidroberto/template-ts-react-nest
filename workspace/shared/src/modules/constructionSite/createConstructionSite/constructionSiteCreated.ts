import {Event} from "@workspace/shared/modules/shared/event";
import {ConstructionSiteDateRange} from "@workspace/shared/modules/constructionSite/constructionSiteDateRange";
import {ConstructionSiteId} from "@workspace/shared/modules/constructionSite/constructionSiteId";

export const CONSTRUCTION_SITE_CREATED_EVENT_TYPE = "constructionSiteCreatedEventType";

export type ConstructionSiteCreated = Event & {
    type: typeof CONSTRUCTION_SITE_CREATED_EVENT_TYPE;
    aggregateId: ConstructionSiteId;
    payload: {
        id: ConstructionSiteId;
        title: string;
        dateRange: ConstructionSiteDateRange;
        location: string;
    };
} ;

export const createConstructionSiteCreatedEvent = (aggregateId: ConstructionSiteId, payload: { id: ConstructionSiteId, title: string, dateRange: ConstructionSiteDateRange, location: string }): ConstructionSiteCreated => {
    return {
        type: CONSTRUCTION_SITE_CREATED_EVENT_TYPE,
        aggregateId,
        payload
    }
}