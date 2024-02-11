import { DateTime, Interval } from "luxon";

export const calculateDaysOff = (
	startDate: Date,
	endDate: Date,
	forcedDaysOff: Date[],
	daysToAllocate: number,
	includeWeekends: boolean = true
): Promise<Date[]> => {
	const intervalStart = DateTime.fromJSDate(startDate);
	const intervalEnd = DateTime.fromJSDate(endDate);
	const fullRangeInterval = Interval.fromDateTimes(intervalStart, intervalEnd);

	const weekendDays = includeWeekends
		? fullRangeInterval
				.splitBy({ days: 1 })
				.filter((day) => day.start.weekday > 5)
				.map((d) => d.start)
		: [];

	const forcedDaysOffDates = forcedDaysOff
		.map((date) => DateTime.fromJSDate(date))
		.filter((date) => fullRangeInterval.contains(date));

	const allForcedDaysOff = [...weekendDays, ...forcedDaysOffDates].sort((a, b) => a.toMillis() - b.toMillis());
	const daysForPairs = [intervalStart.minus({ days: 1 }), ...allForcedDaysOff, intervalEnd.plus({ days: 1 })];

	const intervalBetweenDays = daysForPairs.reduce((acc, date, index, array) => {
		if (index === 0) return acc;
		const previousDate = array[index - 1];
		const interval = Interval.fromDateTimes(previousDate.startOf("day"), date.startOf("day"));
		return [...acc, interval];
	}, []);

	const arrayOfDatesBetween = intervalBetweenDays
		.reduce((acc, interval) => {
			const [, ...dates] = interval.splitBy({ days: 1 }).map((d) => d.start);
			return [...acc, dates];
		}, [])
		.filter((d) => d.length !== 0)
		.sort((a, b) => a.length - b.length);

	const datesToAllocate = arrayOfDatesBetween
		.reduce((acc, dates) => {
			const remainingDays = daysToAllocate - acc.length;
			if (dates.length <= remainingDays) return [...acc, ...dates];
			return acc;
		}, [])
		.sort((a, b) => a.toMillis() - b.toMillis());

	return datesToAllocate.map((d) => d.toJSDate());
};
