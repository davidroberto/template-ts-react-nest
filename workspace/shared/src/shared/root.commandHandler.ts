import {EventStoreRepository} from "./eventStoreRepository";
import {decideGlobal, GlobalCommand, GlobalError} from "./root.decide";

export interface CommandResult {
    success: boolean;
    error?: GlobalError;
}

export class RootCommandHandler {
    constructor(
        private readonly eventStore: EventStoreRepository
    ) {}

    async execute(command: GlobalCommand): Promise<CommandResult> {
        try {
            const aggregateState = await this.eventStore.loadAggregateFromEvents(command.aggregateId);

            const result = decideGlobal(command, aggregateState);

            if (!result.success) {
                return { success: false, error: result.error };
            }

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
                } as GlobalError
            };
        }
    }

}
