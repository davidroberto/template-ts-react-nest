export type Command = {
    type: string;
    aggregateId: string;
    payload: {};
};


export type CommandResult<Events> = {
    success: boolean;
    events?: Events
    error?: CommandError;
}

export type CommandHandlerResult = {
    success: boolean;
    error?: CommandError;
}

export type CommandError =
    | { type: "InvalidCommand"; message: string }
    | { type: "ValidationFailed"; reason: string };
