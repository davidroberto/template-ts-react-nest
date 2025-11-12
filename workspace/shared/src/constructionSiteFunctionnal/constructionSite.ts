import {
    CONSTRUCTION_SITE_CREATED, ConstructionSiteCreated
} from "./createConstructionSite/constructionSiteCreated.event";
import {CreateConstructionSiteCommand} from "./createConstructionSite/createConstructionSite.command";
import {decideCreateConstructionSite} from "./createConstructionSite/createConstructionSite.decide";
import {evolveConstructionSiteCreated} from "./createConstructionSite/createConstructionSite.evolve";

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

export type ConstructionSiteCommand = CreateConstructionSiteCommand;


export type ConstructionSiteError =
    | { type: "InvalidCommand"; message: string }
    | { type: "ValidationFailed"; reason: string };


export type DecideResult =
    | { success: true; events: ConstructionSiteEvent[] }
    | { success: false; error: ConstructionSiteError };



export const decide = (
    command: ConstructionSiteCommand,
    state: ConstructionSiteState
): DecideResult => {
    switch (command.type) {
        case "CreateConstructionSite":
            return decideCreateConstructionSite(command, state);
        default:
            return {
                success: false,
                error: {
                    type: "InvalidCommand",
                    message: `Unknown command type: ${(command as any).type}`
                }
            };
    }
};



export const evolve = (
    state: ConstructionSiteState,
    event: ConstructionSiteEvent
): ConstructionSiteState => {
    switch (event.type) {
        case CONSTRUCTION_SITE_CREATED:
            return evolveConstructionSiteCreated(state, event);
        default:
            return state;
    }
};


export const loadFromEvents = (
    events: ConstructionSiteEvent[]
): ConstructionSiteState => {
    return events.reduce(
        (state, event) => evolve(state, event),
        null as ConstructionSiteState
    );
};

export const initialState = (): ConstructionSiteState => null;