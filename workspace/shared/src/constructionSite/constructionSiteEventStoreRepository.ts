import {ConstructionSiteEvent} from "@workspace/shared/constructionSite/constructionSite";

export type AppendConstructionSiteEvents = (constructionSiteId: string, events: ConstructionSiteEvent[]) => Promise<void>;
export type LoadConstructionSiteEvents = (constructionSite: string) => Promise<ConstructionSiteEvent[]>;
