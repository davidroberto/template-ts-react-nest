import {Result} from "@workspace/shared/modules/shared/result";

export type ConstructionSiteDateRange = {
  readonly startDate: string;
  readonly endDate: string;
  readonly __brand: "ConstructionSiteDateRange";
};

type DateRangeError = { type: "StartDateAfterEndDate"; startDate: string; endDate: string };


export const createConstructionSiteDateRange = (
  startDate: string,
  endDate: string
): Result<ConstructionSiteDateRange, DateRangeError> => {

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (start > end) {
    return {
      success: false,
      error: { type: "StartDateAfterEndDate", startDate, endDate },
    };
  }

  return {
    success: true,
    value: { startDate, endDate, __brand: "ConstructionSiteDateRange" } as ConstructionSiteDateRange,
  };
};
