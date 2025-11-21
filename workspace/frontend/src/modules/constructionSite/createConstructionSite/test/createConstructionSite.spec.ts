import {beforeEach, describe, expect, test} from "vitest";
import {randomUUID} from "crypto";

import {
    appendConstructionSiteEvents, clearAllEvents, loadConstructionSiteEvents
} from "@workspace/shared/modules/constructionSite/constructionSiteInMemoryEventStoreRepository.ts";
import {
    CREATE_CONSTRUCTION_SITE_COMMAND_TYPE, type CreateConstructionSiteCommand
} from "@workspace/shared/modules/constructionSite/createConstructionSite/decideCreateConstructionSite.ts";
import {
    makeHandleCreateConstructionSiteCommand
} from "@workspace/frontend/modules/constructionSite/createConstructionSite/createconstructionSiteCommandHandler.ts";
import {expectValidationFailed} from "@workspace/shared/modules/shared/test/expectValidationFailed.ts";



describe('US-1: Création d\'un chantier', () => {

    let handleCommand: ReturnType<typeof makeHandleCreateConstructionSiteCommand>;

    beforeEach(() => {
        clearAllEvents();
        handleCommand = makeHandleCreateConstructionSiteCommand(
            appendConstructionSiteEvents,
            loadConstructionSiteEvents
        );
    });

    test('US-1-AC-1: création réussie', async () => {

        //Etant donné que je suis identifié en tant sarah, administratrice

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
            }

        };

        const result = await handleCommand(command);

        expect(result.success).toBe(true);

        // Alors le chantier doit être créé avec ces infos
        // titre : Elagage Val louron
        // date de début : 20 novembre 2025
        // date de fin : 30 novembre 2025
        // Lieu : Le Forum, 65240 VAL LOURON
        const events = await loadConstructionSiteEvents(constructionSiteId);
        expect(events).toHaveLength(1);
        const creationEvent = events[0];
        expect(creationEvent.type).toBe("constructionSiteCreatedEventType");
        expect(creationEvent.payload.id.value).toBe(constructionSiteId);
        expect(creationEvent.payload.title).toBe("Elagage Val louron");
        expect(creationEvent.payload.dateRange.startDate).toBe("20/11/2025");
        expect(creationEvent.payload.dateRange.endDate).toBe("30/11/2025");
        expect(creationEvent.payload.location).toBe("Le Forum, 65240 VAL LOURON");


    })

    test('US-1-AC-2: erreur si date de début après date de fin', async () => {

        //Etant donné que je suis identifié en tant sarah, administratrice

        //Quand je créé un chantier avec :
        // titre : Elagage Val louron
        // date de début : 30 novembre 2025
        // date de fin : 20 novembre 2025
        // Lieu : Le Forum, 65240 VAL LOURON
        const constructionSiteId = randomUUID();

        const command: CreateConstructionSiteCommand = {
            type: CREATE_CONSTRUCTION_SITE_COMMAND_TYPE,
            aggregateId: constructionSiteId,
            payload: {
                id: constructionSiteId,
                title: "Elagage Val louron",
                startDate: "30/11/2025",
                endDate: "20/11/2025",
                location: "Le Forum, 65240 VAL LOURON",
            }

        };

        const result = await handleCommand(command);

        // Alors je dois recevoir une erreur « Invalid date range: StartDateAfterEndDate »
        expectValidationFailed(result, "Invalid date range: StartDateAfterEndDate");




    })



})
