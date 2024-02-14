import { expect, test } from "vitest";
import { DateTime, Interval } from "luxon";
import { getIntervalsBetweenDates } from "./getIntervalsBetweenDates";

test("gets intervals between DateTime objects correctly", () => {
	const dates = [
		DateTime.local(2024, 1, 1),
		DateTime.local(2024, 1, 2),
		DateTime.local(2024, 1, 3),
		DateTime.local(2024, 2, 14),
	];

	const expectedIntervals = [
		Interval.fromDateTimes(DateTime.local(2024, 1, 1), DateTime.local(2024, 1, 2)),
		Interval.fromDateTimes(DateTime.local(2024, 1, 2), DateTime.local(2024, 1, 3)),
		Interval.fromDateTimes(DateTime.local(2024, 1, 3), DateTime.local(2024, 2, 14)),
	];

	const result = getIntervalsBetweenDates(dates);

	expect(result).toEqual(expectedIntervals);
});
