import {ConstructionSiteEvent, ConstructionSiteState} from "@workspace/shared/constructionSite/constructionSite";

export interface ConstructionSiteEventStoreRepository {
    append(event: ConstructionSiteEvent): Promise<void>;
    loadConstructionSite(aggregateId: string): Promise<ConstructionSiteState>;
}