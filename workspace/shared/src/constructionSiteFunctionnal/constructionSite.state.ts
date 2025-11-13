import {
    CONSTRUCTION_SITE_CREATED_EVENT_TYPE, ConstructionSiteCreatedEvent
} from "./createConstructionSite/constructionSiteCreated.event";
import {evolveConstructionSiteCreated} from "./createConstructionSite/createConstructionSite.evolve";
import {DomainEvent} from "../shared/domain.event";

export type ConstructionSiteEvent = ConstructionSiteCreatedEvent;

export type ConstructionSiteState = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    creatorId: string;
    version: number;
} | null;


export const evolve = (
    state: ConstructionSiteState,
    event: ConstructionSiteEvent
): ConstructionSiteState => {
    switch (event.type) {
        case CONSTRUCTION_SITE_CREATED_EVENT_TYPE:
            return evolveConstructionSiteCreated(state, event);
        default:
            return state;
    }
};

export const hydrateConstructionSiteFromEvents = (
    events: DomainEvent[],
): ConstructionSiteState => {
    return events.reduce(
        (state, event) => evolve(state, event as ConstructionSiteEvent),
        null as ConstructionSiteState
    );
};
