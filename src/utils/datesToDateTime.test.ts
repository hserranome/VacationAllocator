import { expect, test } from "vitest";
import { DateTime } from "luxon";
import { datesToDatetime } from "./datesToDatetime";

test("converts Date objects to DateTime objects correctly", () => {
	const dates = [
		new Date(2022, 0, 1), // January 1, 2022
		new Date(2022, 11, 31), // December 31, 2022
	];

	const expectedDates = [DateTime.local(2022, 1, 1), DateTime.local(2022, 12, 31)];

	const result = datesToDatetime(dates);

	expect(result).toEqual(expectedDates);
});
