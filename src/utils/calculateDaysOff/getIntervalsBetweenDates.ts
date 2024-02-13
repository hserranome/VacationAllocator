import { DateTime, Interval } from "luxon";

export const getIntervalsBetweenDates = (dates: DateTime[]): Interval[] => {
	return dates.reduce((acc: Interval[], date: DateTime, index: number, array: DateTime[]) => {
		if (index === 0) return acc;
		const previousDate = array[index - 1];
		const interval = Interval.fromDateTimes(previousDate.startOf("day"), date.startOf("day"));
		return [...acc, interval];
	}, []);
};
