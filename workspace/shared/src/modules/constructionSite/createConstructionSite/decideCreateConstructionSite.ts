import {
    ConstructionSiteCreated, createConstructionSiteCreatedEvent
} from "@workspace/shared/modules/constructionSite/createConstructionSite/constructionSiteCreated";
import {ConstructionSiteState} from "@workspace/shared/modules/constructionSite/constructionSite";
import {CommandResult} from "@workspace/shared/modules/shared/command";
import {createConstructionSiteDateRange} from "@workspace/shared/modules/constructionSite/constructionSiteDateRange";
import {createConstructionSiteId} from "@workspace/shared/modules/constructionSite/constructionSiteId";

export const CREATE_CONSTRUCTION_SITE_COMMAND_TYPE = "CreateConstructionSiteCommandType";

export type CreateConstructionSiteCommand = {
    type: typeof CREATE_CONSTRUCTION_SITE_COMMAND_TYPE;
    aggregateId: string;
    payload: {
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        location: string;
    };
};

export const decideCreateConstructionSite = (
    _constructionSitestate: ConstructionSiteState,
    createConstructionSitecommand: CreateConstructionSiteCommand,
): CommandResult<[ConstructionSiteCreated]> => {

    const {id, title, startDate, endDate, location} = createConstructionSitecommand.payload;

    const constructionSiteIdResult = createConstructionSiteId(id);

    if (!constructionSiteIdResult.success) {
        return {
            success: false,
            error: {
                type: "ValidationFailed",
                reason: `Invalid construction site ID: ${constructionSiteIdResult.error.type}`
            }
        };
    }

    const constructionSiteId = constructionSiteIdResult.value!;

    // Validate DateRange
    const dateRangeResult = createConstructionSiteDateRange(startDate, endDate);

    if (!dateRangeResult.success) {
        return {
            success: false,
            error: {
                type: "ValidationFailed",
                reason: `Invalid date range: ${dateRangeResult.error.type}`
            }
        };
    }

    const dateRange = dateRangeResult.value!;

    const constructionSiteCreatedEvent = createConstructionSiteCreatedEvent(constructionSiteId, {
        id: constructionSiteId,
        title: title,
        dateRange: dateRange,
        location: location,
    });

    return { success: true, value: [constructionSiteCreatedEvent] };
};