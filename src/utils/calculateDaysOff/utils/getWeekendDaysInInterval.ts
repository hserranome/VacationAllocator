import { DateTime, Interval } from "luxon";

export const getWeekendDaysInInterval = (interval: Interval): DateTime[] => {
	const endOfIntervalIsWeekend = interval.end.weekday > 5;
	const weekendsInInterval = interval
		.splitBy({ days: 1 })
		.filter((day) => day.start.weekday > 5)
		.map((d) => d.start);
	const weekendsInFullInterval = endOfIntervalIsWeekend ? weekendsInInterval.concat(interval.end) : weekendsInInterval;
	return weekendsInFullInterval;
};
