import {Result} from "@workspace/shared/modules/shared/result";

export type ConstructionSiteId = {
  readonly value: string;
  readonly __brand: "ConstructionSiteId";
};

type ConstructionSiteIdError =
  | { type: "EmptyId" }
  | { type: "InvalidUuidFormat"; id: string };

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const createConstructionSiteId = (
  id: string
): Result<ConstructionSiteId, ConstructionSiteIdError> => {

  if (id.trim() === "") {
    return {
      success: false,
      error: { type: "EmptyId" },
    };
  }

  if (!UUID_REGEX.test(id)) {
    return {
      success: false,
      error: { type: "InvalidUuidFormat", id },
    };
  }

  return {
    success: true,
    value: { value: id, __brand: "ConstructionSiteId" } as ConstructionSiteId,
  };
};