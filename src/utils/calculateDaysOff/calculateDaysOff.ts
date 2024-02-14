import { DateTime, Interval } from "luxon";
import {
	filterDatesWithinInterval,
	getDatesBetweenIntervals,
	getIntervalsBetweenDates,
	getWeekendDaysInInterval,
	sortDates,
} from "./utils";
import { allocateElements } from "../allocateElements";

export const calculateDaysOff = (
	startDate: DateTime,
	endDate: DateTime,
	forcedDaysOff: DateTime[],
	daysToAllocate: number,
	includeWeekends: boolean = true
): DateTime[] => {
	const fullRangeInterval = Interval.fromDateTimes(startDate, endDate);
	const weekendDays = includeWeekends ? getWeekendDaysInInterval(fullRangeInterval) : [];
	const forcedDaysOffInRange = filterDatesWithinInterval(forcedDaysOff, fullRangeInterval);
	const allForcedDaysOff = sortDates([...weekendDays, ...forcedDaysOffInRange]);

	const allIntervalsDates: DateTime[] = [
		startDate.minus({ days: 1 }).startOf("day"),
		...allForcedDaysOff,
		endDate.plus({ days: 1 }).startOf("day"),
	];

	const intervalBetweenDays = getIntervalsBetweenDates(allIntervalsDates);

	const arrayOfDatesBetween = getDatesBetweenIntervals(intervalBetweenDays);

	const datesToAllocate = allocateElements(arrayOfDatesBetween, daysToAllocate);

	const sortedDatesToAllocate = sortDates(datesToAllocate);

	return sortedDatesToAllocate;
};
