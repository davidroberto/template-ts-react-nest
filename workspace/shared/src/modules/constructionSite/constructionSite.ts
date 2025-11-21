
import {
    CONSTRUCTION_SITE_CREATED_EVENT_TYPE, ConstructionSiteCreated
} from "@workspace/shared/modules/constructionSite/createConstructionSite/constructionSiteCreated";
import {
    applyConstructionSiteCreated
} from "@workspace/shared/modules/constructionSite/createConstructionSite/applyConstructionSiteCreated";
import {ConstructionSiteDateRange} from "@workspace/shared/modules/constructionSite/constructionSiteDateRange";
import {ConstructionSiteId} from "@workspace/shared/modules/constructionSite/constructionSiteId";

export type ConstructionSiteEvent = ConstructionSiteCreated;

export type ConstructionSiteState = {
    id: ConstructionSiteId;
    title: string;
    dateRange: ConstructionSiteDateRange;
    location: string;
    version: number;
} | null;


export const apply = (
    state: ConstructionSiteState,
    event: ConstructionSiteEvent
): ConstructionSiteState => {
    switch (event.type) {
        case CONSTRUCTION_SITE_CREATED_EVENT_TYPE:
            return applyConstructionSiteCreated(state, event);
        default:
            return state;
    }
};

export const fold = (
    events: ConstructionSiteEvent[],
): ConstructionSiteState => {
    return events.reduce(
        (state, event) => apply(state, event as ConstructionSiteEvent),
        null as ConstructionSiteState
    );
};
