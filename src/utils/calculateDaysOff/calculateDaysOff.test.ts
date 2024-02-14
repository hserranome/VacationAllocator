import { describe, expect, it } from "vitest";
import { calculateDaysOff } from "./calculateDaysOff";
import { DateTime } from "luxon";

describe("calculateDaysOff", () => {
	it("should return days off", async () => {
		const startDate = DateTime.local(2024, 1, 1);
		const endDate = DateTime.local(2024, 1, 7);
		const forcedDaysOff = [DateTime.local(2024, 1, 2)];
		const daysToAllocate = 4;

		const result = await calculateDaysOff(startDate, endDate, forcedDaysOff, daysToAllocate);

		expect(result).toEqual([
			DateTime.local(2024, 1, 1),
			DateTime.local(2024, 1, 3),
			DateTime.local(2024, 1, 4),
			DateTime.local(2024, 1, 5),
		]);
	});
});
