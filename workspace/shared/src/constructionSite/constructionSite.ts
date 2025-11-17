import {
    CREATE_CONSTRUCTION_SITE_COMMAND_TYPE, createConstructionSite, CreateConstructionSiteCommand
} from "@workspace/shared/constructionSite/createConstructionSite/createConstructionSite";
import {
    CONSTRUCTION_SITE_CREATED_EVENT_TYPE, ConstructionSiteCreated
} from "@workspace/shared/constructionSite/createConstructionSite/constructionSiteCreated";
import {
    applyConstructionSiteCreated
} from "@workspace/shared/constructionSite/createConstructionSite/applyConstructionSiteCreated";

export type ConstructionSiteCommand = CreateConstructionSiteCommand;

export type ConstructionSiteEvent = ConstructionSiteCreated;

export type ConstructionSiteState = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    creatorId: string;
    version: number;
} | null;

export const decide = (constructionSiteState: ConstructionSiteState, constructionSiteCommand: ConstructionSiteCommand) => {
    switch (constructionSiteCommand.type) {
        case CREATE_CONSTRUCTION_SITE_COMMAND_TYPE:
            return createConstructionSite(constructionSiteState, constructionSiteCommand)
    }
}

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
