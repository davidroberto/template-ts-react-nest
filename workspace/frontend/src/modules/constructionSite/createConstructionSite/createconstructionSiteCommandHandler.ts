import {fold} from "@workspace/shared/modules/constructionSite/constructionSite.ts";
import type {CommandHandlerResult} from "@workspace/shared/modules/shared/command.ts";
import type {
    AppendConstructionSiteEvents, LoadConstructionSiteEvents
} from "@workspace/shared/modules/constructionSite/constructionSiteEventStoreRepository.ts";
import {
    type CreateConstructionSiteCommand, decideCreateConstructionSite
} from "@workspace/shared/modules/constructionSite/createConstructionSite/decideCreateConstructionSite.ts";

export function makeHandleCreateConstructionSiteCommand (
    appendConstructionSiteEvents: AppendConstructionSiteEvents,
    loadConstructionSiteEvents: LoadConstructionSiteEvents
) {

    return async function handleCreateConstructionSiteCommand(createConstructionSiteCommand: CreateConstructionSiteCommand): Promise<CommandHandlerResult> {
        try {
            const constructionSiteEvents = await loadConstructionSiteEvents(createConstructionSiteCommand.aggregateId);
            const constructionSiteState = fold(constructionSiteEvents);

            const decideResult = decideCreateConstructionSite (constructionSiteState, createConstructionSiteCommand);

            if (!decideResult.success) {
                return { success: false, error: decideResult.error };
            }

            const events = decideResult.value;

            if (events && events.length > 0) {
                await appendConstructionSiteEvents(createConstructionSiteCommand.aggregateId, events);
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: {
                    type: "InvalidCommand",
                    message: error instanceof Error ? error.message : "Unknown error"
                }
            };
        }
    };

}