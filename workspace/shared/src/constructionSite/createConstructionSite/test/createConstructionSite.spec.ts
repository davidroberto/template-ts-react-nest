import {beforeEach, describe, expect, test} from "vitest";
import {randomUUID} from "crypto";
import {
    appendConstructionSiteEvents,
    loadConstructionSiteEvents,
    clearAllEvents
} from "@workspace/shared/constructionSite/constructionSiteInMemoryEventStoreRepository";
import {makeHandleConstructionSiteCommand} from "@workspace/shared/constructionSite/constructionSiteCommandHandler";
import {
    CREATE_CONSTRUCTION_SITE_COMMAND_TYPE, CreateConstructionSiteCommand
} from "@workspace/shared/constructionSite/createConstructionSite/createConstructionSite";


describe('US-1: Création d\'un chantier', () => {

    let handleCommand: ReturnType<typeof makeHandleConstructionSiteCommand>;

    beforeEach(() => {
        clearAllEvents();
        handleCommand = makeHandleConstructionSiteCommand(
            appendConstructionSiteEvents,
            loadConstructionSiteEvents
        );
    })

    test('US-1-AC-1: création réussie', async () => {

        //Etant donné que je suis identifié en tant sarah, administrateur,

        //Quand je créé un chantier avec :
        // titre : Elagage Val louron
        // date de début : 20 novembre 2025
        // date de fin : 30 novembre 2025
        // Lieu : Le Forum, 65240 VAL LOURON
        const constructionSiteId = randomUUID();

        const command: CreateConstructionSiteCommand = {
            type: CREATE_CONSTRUCTION_SITE_COMMAND_TYPE,
            aggregateId: constructionSiteId,
            payload: {
                id: constructionSiteId,
                title: "Elagage Val louron",
                startDate: "20/11/2025",
                endDate: "30/11/2025",
                location: "Le Forum, 65240 VAL LOURON",
                creatorId: "user-sarah"
            }

        };

        const result = await handleCommand(command);

        expect(result.success).toBe(true);

        // Alors le chantier doit être créé avec ces infos
        const events = await loadConstructionSiteEvents(constructionSiteId);
        expect(events).toHaveLength(1);
        const creationEvent = events[0];
        expect(creationEvent.type).toBe("constructionSiteCreatedEventType");
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
