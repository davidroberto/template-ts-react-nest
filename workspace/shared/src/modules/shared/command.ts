import { Result } from "./result";

export type Command = {
    type: string;
    aggregateId: string;
    payload: {};
};

export type CommandError =
    | { type: "InvalidCommand"; message: string }
    | { type: "ValidationFailed"; reason: string };

export type CommandResult<Events> = Result<Events, CommandError>;

export type CommandHandlerResult = Result<void, CommandError>;
