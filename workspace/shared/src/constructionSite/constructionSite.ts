import {
    CONSTRUCTION_SITE_CREATED,
    ConstructionSiteCreated
} from "./createConstructionSite/constructionSiteCreated.event";

type ConstructionSiteEvent = ConstructionSiteCreated;

type ConstructionSiteCreate = { id: string, title: string, startDate: string, endDate: string, location: string, creatorId: string};

export class ConstructionSite {

    private id?: string;
    private title?: string;
    private startDate?: string;
    private endDate?: string;
    private location?: string;
    private creatorId?: string;

    private version: number = 0;
    private uncommittedEvents: ConstructionSiteEvent[] = [];

    private constructor() {}

    static create(constructionSiteCreate: ConstructionSiteCreate) {
        const constructionSite = new ConstructionSite();
        const {id, title, startDate, endDate, location, creatorId} = constructionSiteCreate;
        constructionSite.raise(new ConstructionSiteCreated(id, {
            id,
            title,
            startDate,
            endDate,
            location,
            creatorId
        }));
        return constructionSite;
    }

    private raise(event: ConstructionSiteEvent) {
        this.apply(event);
        this.uncommittedEvents.push(event);
    }

    private apply(event: ConstructionSiteEvent) {
        if (event.type === CONSTRUCTION_SITE_CREATED) {
            this.id = event.payload.id;
            this.title = event.payload.title;
            this.startDate = event.payload.startDate;
            this.endDate = event.payload.endDate;
            this.location = event.payload.location;
            this.creatorId = event.payload.id;
            this.version += 1;
        }
    }

    getUncommittedEvents() {
        return this.uncommittedEvents;
    }

    clearUncommittedEvents() {
        this.uncommittedEvents = [];
    }



}