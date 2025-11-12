import {CreateConstructionSiteCommand} from "./createConstructionSite.command";
import {ConstructionSiteCreated} from "./constructionSiteCreated.event";
import {ConstructionSiteState, DecideResult} from "../constructionSite";

export const decideCreateConstructionSite = (
    command: CreateConstructionSiteCommand,
    state: ConstructionSiteState
): DecideResult => {

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