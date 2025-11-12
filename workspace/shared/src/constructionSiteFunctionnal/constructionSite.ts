import {
    CONSTRUCTION_SITE_CREATED, ConstructionSiteCreated
} from "./createConstructionSite/constructionSiteCreated.event";
import {CreateConstructionSiteCommand} from "./createConstructionSite/createConstructionSite.command";

// Events
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

// Errors
export type ConstructionSiteError =
    | { type: "ConstructionSiteAlreadyExists"; id: string }
    | { type: "InvalidCommand"; message: string }
    | { type: "ValidationFailed"; reason: string };

// Result type
export type DecideResult =
    | { success: true; events: ConstructionSiteEvent[] }
    | { success: false; error: ConstructionSiteError };


// ============================================================================
// DECIDE - Pure function: Command + State → Events | Error
// ============================================================================

/**
 * Décide si la commande CREATE est valide et retourne les événements à persister
 *
 * Note: Dans une architecture avec use cases spécifiques (CreateUseCase, UpdateUseCase, etc.),
 * chaque use case appelle directement sa fonction decide correspondante.
 * Le pattern "decide central avec switch" est utile uniquement pour :
 * - Command Bus pattern (CQRS)
 * - API générique recevant différentes commandes
 * - Replay de command log
 */
export const decideCreate = (
    command: CreateConstructionSiteCommand,
    state: ConstructionSiteState
): DecideResult => {
    // Business rule: Cannot create if already exists
    if (state !== null) {
        return {
            success: false,
            error: { type: "ConstructionSiteAlreadyExists", id: state.id }
        };
    }


    // Valid command - return event
    const event = new ConstructionSiteCreated(command.id, {
        id: command.id,
        title: command.title,
        startDate: command.startDate,
        endDate: command.endDate,
        location: command.location,
        creatorId: command.creatorId
    });

    return { success: true, events: [event] };
};

// ============================================================================
// EVOLVE - Pure function: State + Event → New State
// ============================================================================

export const evolve = (
    state: ConstructionSiteState,
    event: ConstructionSiteEvent
): ConstructionSiteState => {
    switch (event.type) {
        case CONSTRUCTION_SITE_CREATED:
            return evolveCreated(state, event);
        default:
            return state;
    }
};

const evolveCreated = (
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

// ============================================================================
// HELPERS - Aggregate operations
// ============================================================================

// Load aggregate from event stream
export const loadFromEvents = (
    events: ConstructionSiteEvent[]
): ConstructionSiteState => {
    return events.reduce(
        (state, event) => evolve(state, event),
        null as ConstructionSiteState
    );
};

// Initial empty state
export const initialState = (): ConstructionSiteState => null;