import {expect} from "vitest";
import {CommandHandlerResult} from "@workspace/shared/modules/shared/command";


export function expectValidationFailed(
    result: CommandHandlerResult,
    expectedReason: string
): asserts result is {
    success: false;
    error: { type: "ValidationFailed"; reason: string };
} {
    expect(result.success).toBe(false);

    if (result.success) {
        throw new Error("Expected command to fail, but it succeeded");
    }

    expect(result.error.type).toBe("ValidationFailed");

    if (result.error.type !== "ValidationFailed") {
        throw new Error(`Expected error type to be 'ValidationFailed', but got '${result.error.type}'`);
    }

    expect(result.error.reason).toBe(expectedReason);
}