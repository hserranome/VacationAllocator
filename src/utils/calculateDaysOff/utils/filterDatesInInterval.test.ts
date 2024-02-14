import { expect, test } from "vitest";
import { DateTime, Interval } from "luxon";
import { filterDatesWithinInterval } from "./filterDatesInInterval";

test("filters dates within interval correctly", () => {
	const interval = Interval.fromDateTimes(DateTime.local(2024, 1, 1), DateTime.local(2024, 1, 31));

	const dates = [
		DateTime.local(2024, 1, 1), // within interval
		DateTime.local(2024, 1, 15), // within interval
		DateTime.local(2024, 1, 31), // within interval
		DateTime.local(2024, 2, 1), // outside interval
		DateTime.local(2023, 12, 31), // outside interval
	];

	const expectedDates = [DateTime.local(2024, 1, 1), DateTime.local(2024, 1, 15), DateTime.local(2024, 1, 31)];

	const result = filterDatesWithinInterval(dates, interval);

	expect(result).toEqual(expectedDates);
});
