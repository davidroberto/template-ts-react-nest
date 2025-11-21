export type Event = {
    type: string;
    aggregateId: {
        value: string;
        __brand: string;
    };
    payload: {};
}