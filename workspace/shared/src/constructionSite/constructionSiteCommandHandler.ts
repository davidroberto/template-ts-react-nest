import {
    ConstructionSiteEventStoreRepository
} from "@workspace/shared/constructionSite/constructionSiteEventStoreRepository";
import {ConstructionSiteCommand, decide} from "@workspace/shared/constructionSite/constructionSite";
import {CommandHandlerResult} from "@workspace/shared/shared/command";

export class ConstructionSiteCommandHandler {
    constructor(
        private readonly constructionSiteEventStoreRepository: ConstructionSiteEventStoreRepository
    ) {}

    async execute(constructionSiteCommand: ConstructionSiteCommand): Promise<CommandHandlerResult> {
        try {
            const constructionSiteState = await this.constructionSiteEventStoreRepository.loadConstructionSite(constructionSiteCommand.aggregateId);

            const result = decide(constructionSiteState, constructionSiteCommand);

            if (!result.success) {
                return { success: false, error: result.error };
            }


            for (const event of result.events  ?? []) {
                await this.constructionSiteEventStoreRepository.append(event);
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
    }

}
