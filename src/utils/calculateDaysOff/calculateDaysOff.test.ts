import { describe, expect, it } from "vitest";
import { calculateDaysOff } from "./calculateDaysOff";

describe("calculateDaysOff", () => {
	it("should return an array of dates", async () => {
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2024-01-07");
		const forcedDaysOff = [new Date("2024-01-02")];
		const daysToAllocate = 1;

		const result = await calculateDaysOff(startDate, endDate, forcedDaysOff, daysToAllocate);

		expect(result).toEqual([new Date("2024-01-01")]);
	});
});
