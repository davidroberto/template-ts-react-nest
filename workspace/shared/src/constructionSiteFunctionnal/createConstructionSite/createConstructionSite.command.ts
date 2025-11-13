export const CREATE_CONSTRUCTION_SITE_COMMAND_TYPE = "CreateConstructionSiteCommandType";

export type CreateConstructionSiteCommand = {
    type: typeof CREATE_CONSTRUCTION_SITE_COMMAND_TYPE;
    aggregateId: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    creatorId: string;
};