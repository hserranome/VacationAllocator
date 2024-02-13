import { expect, describe, it } from "vitest";
import { DateTime, Interval } from "luxon";
import { getWeekendDaysInInterval } from "./getWeekendDaysInInterval";

describe("getWeekendDaysInInterval", () => {
	it("should return correct weekend days in an array", () => {
		const fullRangeInterval = Interval.fromDateTimes(DateTime.local(2024, 1, 1), DateTime.local(2024, 1, 10));

		const result = getWeekendDaysInInterval(fullRangeInterval);

		const expectedResult = [DateTime.local(2024, 1, 6), DateTime.local(2024, 1, 7)];

		expect(result.map((d) => d.toISODate())).toEqual(expectedResult.map((d) => d.toISODate()));
	});
	it("should return correct weekend days in an array that are at the start or end of interval", () => {
		const intervalStart = DateTime.local(2023, 12, 31); // sunday
		const intervalEnd = DateTime.local(2024, 1, 7); //sunday

		const fullRangeInterval = Interval.fromDateTimes(intervalStart, intervalEnd);

		const result = getWeekendDaysInInterval(fullRangeInterval);

		const expectedDates = [DateTime.local(2023, 12, 31), DateTime.local(2024, 1, 6), DateTime.local(2024, 1, 7)];

		expect(result.map((d) => d.toISODate())).toEqual(expectedDates.map((d) => d.toISODate()));
	});
});
