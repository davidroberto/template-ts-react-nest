// Commands
export type CreateConstructionSiteCommand = {
    type: "CreateConstructionSite";
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    creatorId: string;
};