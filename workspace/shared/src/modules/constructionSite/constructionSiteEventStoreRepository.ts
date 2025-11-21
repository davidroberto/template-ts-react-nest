import {ConstructionSiteEvent} from "@workspace/shared/modules/constructionSite/constructionSite";

export type AppendConstructionSiteEvents = (constructionSiteId: string, events: ConstructionSiteEvent[]) => Promise<void>;
export type LoadConstructionSiteEvents = (constructionSite: string) => Promise<ConstructionSiteEvent[]>;
