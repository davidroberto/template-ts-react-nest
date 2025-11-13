import {decideCreateConstructionSite} from "./createConstructionSite/createConstructionSite.decide";
import {
    ConstructionSiteEvent, ConstructionSiteState
} from "./constructionSite.state";
import {
    CREATE_CONSTRUCTION_SITE_COMMAND_TYPE,
    CreateConstructionSiteCommand
} from "./createConstructionSite/createConstructionSite.command";
import {DecideResult} from "../shared/root.decide";

export type ConstructionSiteCommand = CreateConstructionSiteCommand;

export const decideConstructionSite = (
    command: ConstructionSiteCommand,
    state: ConstructionSiteState
): DecideResult<ConstructionSiteEvent> => {
    switch (command.type) {
        case CREATE_CONSTRUCTION_SITE_COMMAND_TYPE:
            return decideCreateConstructionSite(command, state);
    }
};