import {ConstructionSiteState} from "@workspace/shared/modules/constructionSite/constructionSite";
import {
    ConstructionSiteCreated
} from "@workspace/shared/modules/constructionSite/createConstructionSite/constructionSiteCreated";

export const applyConstructionSiteCreated = (
    _state: ConstructionSiteState,
    event: ConstructionSiteCreated
): ConstructionSiteState => {
    return {
        id: event.payload.id,
        title: event.payload.title,
        dateRange: event.payload.dateRange,
        location: event.payload.location,
        version: 1
    };
};