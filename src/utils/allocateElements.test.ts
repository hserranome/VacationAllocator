import { describe, expect, it } from "vitest";
import { allocateElements } from "./allocateElements";

describe("allocateElements", () => {
	it("allocates number of elements correctly", () => {
		const arrayOfArrays = [
			[1, 2, 3],
			[4, 5],
			[6, 7, 8, 9],
		];

		const elementsToAllocate = 5;

		const expectedElements = [1, 2, 3, 4, 5];

		const result = allocateElements(arrayOfArrays, elementsToAllocate);

		expect(result).toEqual(expectedElements);
	});
	it("allocates elements correctly, ignoring the entire array if we cant allocate it properly", () => {
		const arrayOfArrays = [
			[1, 2, 3],
			[4, 5],
			[6, 7, 8, 9],
		];

		const elementsToAllocate = 7;

		const expectedElements = [1, 2, 3, 4, 5];

		const result = allocateElements(arrayOfArrays, elementsToAllocate);

		expect(result).toEqual(expectedElements);
	});
});
