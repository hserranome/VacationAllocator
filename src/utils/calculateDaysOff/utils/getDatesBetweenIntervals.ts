import { DateTime, Interval } from "luxon";

export const getDatesBetweenIntervals = (intervals: Interval[]): DateTime[][] => {
	return intervals
		.reduce((acc: DateTime[][], interval: Interval) => {
			const [, ...dates] = interval.splitBy({ days: 1 }).map((d) => d.start);
			return [...acc, dates];
		}, [])
		.filter((d) => d.length !== 0)
		.sort((a, b) => a.length - b.length);
};
