import {ConstructionSiteState} from "@workspace/shared/constructionSite/constructionSite";
import {
    ConstructionSiteCreated
} from "@workspace/shared/constructionSite/createConstructionSite/constructionSiteCreated";

export const applyConstructionSiteCreated = (
    _state: ConstructionSiteState,
    event: ConstructionSiteCreated
): ConstructionSiteState => {
    return {
        id: event.payload.id,
        title: event.payload.title,
        startDate: event.payload.startDate,
        endDate: event.payload.endDate,
        location: event.payload.location,
        creatorId: event.payload.creatorId,
        version: 1
    };
};