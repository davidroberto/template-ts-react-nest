import {
    AppendConstructionSiteEvents,
    LoadConstructionSiteEvents
} from "@workspace/shared/modules/constructionSite/constructionSiteEventStoreRepository";
import {ConstructionSiteEvent} from "@workspace/shared/modules/constructionSite/constructionSite";

const eventsStore = new Map<string, ConstructionSiteEvent[]>();

export const appendConstructionSiteEvents: AppendConstructionSiteEvents = async (constructionSiteId, events) => {
    const existingEvents = eventsStore.get(constructionSiteId) || [];
    eventsStore.set(constructionSiteId, [...existingEvents, ...events]);
};

export const loadConstructionSiteEvents: LoadConstructionSiteEvents = async (constructionSiteId) => {
    return eventsStore.get(constructionSiteId) || [];
};

export const clearAllEvents = () => {
    eventsStore.clear();
};