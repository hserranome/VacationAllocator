import { describe, expect, it } from "vitest";
import { DateTime, Interval } from "luxon";
import { getDatesBetweenIntervals } from "./getDatesBetweenIntervals";

describe("getDatesBetweenIntervals", () => {
	it("gets dates between Intervals", () => {
		const intervals = [Interval.fromDateTimes(DateTime.local(2023, 12, 31), DateTime.local(2024, 1, 4))];

		const result = getDatesBetweenIntervals(intervals);

		const expectedDates = [[DateTime.local(2024, 1, 1), DateTime.local(2024, 1, 2), DateTime.local(2024, 1, 3)]];

		expect(result).toEqual(expectedDates);
	});
	it("gets dates between Intervals", () => {
		const intervals = [
			Interval.fromDateTimes(DateTime.local(2024, 1, 1), DateTime.local(2024, 1, 2)),
			Interval.fromDateTimes(DateTime.local(2024, 1, 2), DateTime.local(2024, 1, 4)),
			Interval.fromDateTimes(DateTime.local(2024, 1, 4), DateTime.local(2024, 1, 7)),
		];

		const result = getDatesBetweenIntervals(intervals);

		const expectedDates = [[DateTime.local(2024, 1, 3)], [DateTime.local(2024, 1, 5), DateTime.local(2024, 1, 6)]];

		expect(result).toEqual(expectedDates);
	});
});
