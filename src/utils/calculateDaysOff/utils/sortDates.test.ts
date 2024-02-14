import { expect, test } from "vitest";
import { DateTime } from "luxon";
import { sortDates } from "./sortDates";

test("sorts DateTime objects correctly", () => {
	const dates = [
		DateTime.local(2022, 12, 31), // December 31, 2022
		DateTime.local(2022, 1, 1), // January 1, 2022
	];

	const expectedDates = [DateTime.local(2022, 1, 1), DateTime.local(2022, 12, 31)];

	const result = sortDates(dates);

	expect(result).toEqual(expectedDates);
});
