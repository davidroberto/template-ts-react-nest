import {CreateConstructionSiteCommand} from "./createConstructionSite.command";
import {createConstructionSiteCreatedEvent, ConstructionSiteCreatedEvent} from "./constructionSiteCreated.event";
import {ConstructionSiteState} from "../constructionSite.state";
import {DecideResult} from "../../shared/root.decide";

export const decideCreateConstructionSite = (
    command: CreateConstructionSiteCommand,
    _state: ConstructionSiteState
): DecideResult<ConstructionSiteCreatedEvent> => {


    // validate business rules

    const constructionSiteCreatedEvent = createConstructionSiteCreatedEvent(command.aggregateId, {
        id: command.aggregateId,
        title: command.title,
        startDate: command.startDate,
        endDate: command.endDate,
        location: command.location,
        creatorId: command.creatorId
    });

    return { success: true, events: [constructionSiteCreatedEvent] };
};