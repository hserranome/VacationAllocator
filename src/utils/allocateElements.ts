export const allocateElements = <T>(arrayOfArrays: T[][], elementsToAllocate: number): T[] => {
	return arrayOfArrays.reduce((acc: T[], array: T[]) => {
		const remainingElements = elementsToAllocate - acc.length;
		if (array.length <= remainingElements) return [...acc, ...array];
		return acc;
	}, []);
};
