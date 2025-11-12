import {
    ConstructionSiteCommand,
    ConstructionSiteState,
    ConstructionSiteError,
    decide,
    initialState,
    loadFromEvents
} from "./constructionSite";
import { EventStoreRepository } from "./eventStoreRepository";

export interface CommandResult {
    success: boolean;
    error?: ConstructionSiteError;
}

export class GenericCommandHandler {
    constructor(private readonly eventStore: EventStoreRepository) {}


    async execute(command: ConstructionSiteCommand): Promise<CommandResult> {
        try {
            const state = await this.loadState(command);

            const result = decide(command, state);

            if (!result.success) {
                return { success: false, error: result.error };
            }

            // 3. Persist events
            for (const event of result.events) {
                await this.eventStore.append(event);
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


    private async loadState(
        command: ConstructionSiteCommand
    ): Promise<ConstructionSiteState> {
        switch (command.type) {
            case "CreateConstructionSite":
                // Create : état initial (null)
                return initialState();

            // Quand tu ajouteras Update/Delete :
            // case "UpdateConstructionSite":
            // case "DeleteConstructionSite":
            //     const events = await this.eventStore.getEventsByAggregateId(
            //         command.id
            //     );
            //     return loadFromEvents(events);

            default:
                return initialState();
        }
    }
}
