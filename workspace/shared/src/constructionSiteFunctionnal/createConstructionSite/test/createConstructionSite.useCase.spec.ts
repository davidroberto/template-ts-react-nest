import {beforeEach, describe, expect, test} from "vitest";
import {randomUUID} from "crypto";
import {CreateConstructionSiteUseCase} from "../createConstructionSite.commandHandler";
import {InMemoryEventStoreRepository} from "../../../shared/eventStoreRepository.inMemory";

describe('US-1: Création d\'un chantier', () => {

    let eventStoreRepository: InMemoryEventStoreRepository;

    beforeEach(() => {
        eventStoreRepository = new InMemoryEventStoreRepository();
    })

    test('US-1-AC-1: création réussie', async () => {

        //Etant donné que je suis identifié en tant sarah, administrateur,
        const createConstructionSiteUseCase = new CreateConstructionSiteUseCase(eventStoreRepository);

        //Quand je créé un chantier avec :
        // titre : Elagage Val louron
        // date de début : 20 novembre 2025
        // date de fin : 30 novembre 2025
        // Lieu : Le Forum, 65240 VAL LOURON
        const constructionSiteId = randomUUID();
        await createConstructionSiteUseCase.execute({
            type: "CreateConstructionSite",
            commandId: randomUUID(),
            payload: {
                id: constructionSiteId,
                title: "Elagage Val louron",
                startDate: "20/11/2025",
                endDate: "30/11/2025",
                location: "Le Forum, 65240 VAL LOURON",
                creatorId: "user-sarah"
            }
        });

        // Alors le chantier doit être créé avec ces infos
        const events = await eventStoreRepository.getEventsByAggregateId(constructionSiteId);
        expect(events).toHaveLength(1);
        const creationEvent = events[0];
        expect(creationEvent.type).toBe("constructionSiteCreated");
        expect(creationEvent.payload).toEqual({
            id: constructionSiteId,
            title: "Elagage Val louron",
            startDate: "20/11/2025",
            endDate: "30/11/2025",
            location: "Le Forum, 65240 VAL LOURON",
            creatorId: "user-sarah"
        });


    })



})
