import {DomainEvent} from "../shared/domain.event";

export interface EventStoreRepository {
    append(event: DomainEvent): Promise<void>;
}