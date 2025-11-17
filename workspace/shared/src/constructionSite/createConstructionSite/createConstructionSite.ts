import {ConstructionSiteState} from "@workspace/shared/constructionSite/constructionSite";
import {CommandResult} from "@workspace/shared/shared/command";
import {
    ConstructionSiteCreated, createConstructionSiteCreatedEvent
} from "@workspace/shared/constructionSite/createConstructionSite/constructionSiteCreated";

export const CREATE_CONSTRUCTION_SITE_COMMAND_TYPE = "CreateConstructionSiteCommandType";

export type CreateConstructionSiteCommand = {
    type: typeof CREATE_CONSTRUCTION_SITE_COMMAND_TYPE;
    aggregateId: string;
    payload: {
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        location: string;
        creatorId: string;
    };
};

export const createConstructionSite = (
    _constructionSitestate: ConstructionSiteState,
    createConstructionSitecommand: CreateConstructionSiteCommand,
): CommandResult<[ConstructionSiteCreated]> => {


    // validate business rules

    const {title, startDate, endDate, location, creatorId} = createConstructionSitecommand.payload;

    const constructionSiteCreatedEvent = createConstructionSiteCreatedEvent(createConstructionSitecommand.aggregateId, {
        id: createConstructionSitecommand.aggregateId,
        title: title,
        startDate: startDate,
        endDate: endDate,
        location: location,
        creatorId: creatorId
    });

    return { success: true, events: [constructionSiteCreatedEvent] };
};