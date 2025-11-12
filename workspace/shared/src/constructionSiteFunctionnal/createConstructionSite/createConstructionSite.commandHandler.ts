import {
    decideCreate,
    initialState,
    ConstructionSiteError
} from "../constructionSite";
import { EventStoreRepository } from "../eventStoreRepository";
import {CreateConstructionSiteCommand} from "./createConstructionSite.command";

export type CreateConstructionSiteCommandInput = {
    type: "CreateConstructionSite";
    commandId: `${string}-${string}-${string}-${string}-${string}`;
    payload: {
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        location: string;
        creatorId: string;
    };
};

export type CreateConstructionSiteResult =
    | { success: true }
    | { success: false; error: ConstructionSiteError };

export class CreateConstructionSiteUseCase {
    constructor(private readonly eventStoreRepository: EventStoreRepository) {}

    public async execute(
        input: CreateConstructionSiteCommandInput
    ): Promise<CreateConstructionSiteResult> {
        // Convert input to domain command
        const command: CreateConstructionSiteCommand = {
            type: "CreateConstructionSite",
            id: input.payload.id,
            title: input.payload.title,
            startDate: input.payload.startDate,
            endDate: input.payload.endDate,
            location: input.payload.location,
            creatorId: input.payload.creatorId
        };

        // Get current state (in this case, initial/empty for new aggregate)
        const currentState = initialState();

        // Decide: Command + State → Events | Error
        // ✅ Appel direct - pas besoin de switch car le use case connaît sa commande
        const result = decideCreate(command, currentState);

        if (!result.success) {
            return { success: false, error: result.error };
        }

        // Persist events
        for (const event of result.events) {
            await this.eventStoreRepository.append(event);
        }

        return { success: true };
    }
}