import { expect, test } from "vitest";
import { DateTime } from "luxon";
import { dateTimesToJSDates } from "./dateTimesToDates";

test("converts DateTime objects to Date objects correctly", () => {
	const dates = [DateTime.local(2022, 1, 1), DateTime.local(2022, 12, 31)];

	const expectedDates = [
		new Date(2022, 0, 1), // January 1, 2022
		new Date(2022, 11, 31), // December 31, 2022
	];

	const result = dateTimesToJSDates(dates);

	expect(result).toEqual(expectedDates);
});
