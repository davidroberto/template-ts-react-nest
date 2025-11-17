import {
    AppendConstructionSiteEvents, LoadConstructionSiteEvents
} from "@workspace/shared/constructionSite/constructionSiteEventStoreRepository";
import {ConstructionSiteCommand, decide, fold} from "@workspace/shared/constructionSite/constructionSite";
import {CommandHandlerResult} from "@workspace/shared/shared/command";


export function makeHandleConstructionSiteCommand (
    appendConstructionSiteEvents: AppendConstructionSiteEvents,
    loadConstructionSiteEvents: LoadConstructionSiteEvents
) {

    return async function handleConstructionSiteCommand(constructionSiteCommand: ConstructionSiteCommand): Promise<CommandHandlerResult> {
        try {
            const constructionSiteEvents = await loadConstructionSiteEvents(constructionSiteCommand.aggregateId);
            const constructionSiteState = fold(constructionSiteEvents);

            const result = decide (constructionSiteState, constructionSiteCommand);

            if (!result.success) {
                return { success: false, error: result.error };
            }

            if (result.events && result.events.length > 0) {
                await appendConstructionSiteEvents(constructionSiteCommand.aggregateId, result.events);
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