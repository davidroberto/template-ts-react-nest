import {
    ConstructionSiteEvent, ConstructionSiteState
} from "../constructionSiteFunctionnal/constructionSite.state";
import {
    ConstructionSiteCommand,
    decideConstructionSite
} from "../constructionSiteFunctionnal/constructionSite.decide";

export type GlobalCommand =
    | ConstructionSiteCommand
    ;

export type GlobalState =
    | ConstructionSiteState
    ;

export type GlobalEvent =
    | ConstructionSiteEvent
    ;

export type GlobalError =
    | { type: "InvalidCommand"; message: string }
    | { type: "ValidationFailed"; reason: string };


export type DecideResult<Event> =
    | { success: true; events: Event[] }
    | { success: false; error: GlobalError };


const aggregateDeciders = [
    decideConstructionSite,
];

export const decideGlobal = (
    command: GlobalCommand,
    state: GlobalState
): DecideResult<GlobalEvent> => {

    for (const decider of aggregateDeciders) {
        const result = decider(command, state);
        if (result !== undefined) {
            return result;
        }
    }

    return {
        success: false,
        error: {
            type: "InvalidCommand",
            message: `Unknown command type: ${(command).type}`
        }
    };
};
