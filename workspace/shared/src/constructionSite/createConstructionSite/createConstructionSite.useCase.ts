import {ConstructionSite} from "../constructionSite";
import {EventStoreRepository} from "../eventStoreRepository";

export type createConstructionSiteCommand = {
    type: "CreateConstructionSite",
    commandId: `${string}-${string}-${string}-${string}-${string}`;
    payload: {id: string, title: string, startDate: string, endDate: string, location: string, creatorId: string}
}

export class CreateConstructionSiteUseCase {

    constructor(private readonly eventStoreRepository: EventStoreRepository) {}

    public async execute(createConstructionSiteCommand: createConstructionSiteCommand) {
        const constructionSite = ConstructionSite.create(createConstructionSiteCommand.payload);

        constructionSite.getUncommittedEvents().map(async (uncommittedEvent:any) => {
            await this.eventStoreRepository.append(uncommittedEvent);
        })

        constructionSite.clearUncommittedEvents();

    }

}