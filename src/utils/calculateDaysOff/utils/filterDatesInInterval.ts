import { DateTime, Interval } from "luxon";

export const filterDatesWithinInterval = (dates: DateTime[], interval: Interval): DateTime[] => {
	const normalizedInterval = Interval.fromDateTimes(interval.start.startOf("day"), interval.end.startOf("day"));
	const paddedInterval = Interval.fromDateTimes(normalizedInterval.start, normalizedInterval.end.plus({ days: 1 }));
	return dates.filter((date) => paddedInterval.contains(date.startOf("day")));
};
