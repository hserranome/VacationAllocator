import { DateTime, Interval } from "luxon";
import { getWeekendDaysInInterval } from "./getWeekendDaysInInterval";
import { filterDatesWithinInterval } from "./filterDatesInInterval";
import { sortDates } from "./sortDates";
import { getIntervalsBetweenDates } from "./getIntervalsBetweenDates";
import { getDatesBetweenIntervals } from "./getDatesBetweenIntervals";
import { datesToDatetime } from "./datesToDatetime";

export const calculateDaysOff = (
	startDate: Date,
	endDate: Date,
	forcedDaysOff: Date[],
	daysToAllocate: number,
	includeWeekends: boolean = true
): Date[] => {
	const fullRangeInterval = Interval.fromDateTimes(startDate, endDate);
	const weekendDays = includeWeekends ? getWeekendDaysInInterval(fullRangeInterval) : [];
	const forcedDaysOffInRange = filterDatesWithinInterval(datesToDatetime(forcedDaysOff), fullRangeInterval);
	const allForcedDaysOff = sortDates([...weekendDays, ...forcedDaysOffInRange]);

	const intervalStart = DateTime.fromJSDate(startDate).minus({ days: 1 });
	const intervalEnd = DateTime.fromJSDate(endDate).plus({ days: 1 });
	const allIntervalsDates = [intervalStart, ...allForcedDaysOff, intervalEnd];
	const intervalBetweenDays = getIntervalsBetweenDates(allIntervalsDates);

	const arrayOfDatesBetween = getDatesBetweenIntervals(intervalBetweenDays);

	const datesToAllocate = arrayOfDatesBetween.reduce((acc, dates) => {
		const remainingDays = daysToAllocate - acc.length;
		if (dates.length <= remainingDays) return [...acc, ...dates];
		return acc;
	}, []);

	const sortedDatesToAllocate = sortDates(datesToAllocate);

	const jsDates = sortedDatesToAllocate.map((date) => date.toJSDate());
	return jsDates;
};
