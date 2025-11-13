import {ConstructionSiteState} from "../constructionSite.state";
import {ConstructionSiteCreatedEvent} from "./constructionSiteCreated.event";

export const evolveConstructionSiteCreated = (
    _state: ConstructionSiteState,
    event: ConstructionSiteCreatedEvent
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