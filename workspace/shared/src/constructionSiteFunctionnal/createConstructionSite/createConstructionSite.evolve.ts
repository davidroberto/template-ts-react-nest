import {ConstructionSiteCreated} from "./constructionSiteCreated.event";
import {ConstructionSiteState} from "../constructionSite";

export const evolveConstructionSiteCreated = (
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