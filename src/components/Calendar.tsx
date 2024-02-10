import { DateTime } from "luxon";
import { useCallback, useMemo } from "react";
import { WeekdayHeaderRow } from ".";
import { DAYS_IN_WEEK } from "../constants";

const generateMonthRange = (start: Date, end: Date): Date[] => {
	if (start > end) return [];
	const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1);
	return [new Date(start), ...generateMonthRange(nextMonth, end)];
};

const filterDatesInDateRange = (allDates: Date[], rangeStart: Date, rangeEnd: Date) => {
	return allDates.filter((singleDate) => singleDate >= rangeStart && singleDate <= rangeEnd);
};

const generateMonthCalendarCells = (month: Date) => {
	const firstDayOfWeekIndex = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
	const firstDayOfWeek = firstDayOfWeekIndex === 0 ? 6 : firstDayOfWeekIndex - 1;

	const totalDaysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
	const calendarCells = [
		...Array.from({ length: firstDayOfWeek }).map(() => null),
		...Array.from({ length: totalDaysInMonth }).map((_, i) => i + 1),
	];
	return calendarCells;
};

const splitArrayIntoChunks = (items: number[], chunkSize: number) => {
	const chunk = [];
	const itemsCopy = [...items];
	while (itemsCopy.length > 0) chunk.push(itemsCopy.splice(0, chunkSize));
	return chunk;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
	return DateTime.fromJSDate(date1).toISODate() === DateTime.fromJSDate(date2).toISODate();
};

const dateIsInArray = (date: Date, dateArray: Date[]): boolean => {
	return dateArray.some((d) => isSameDay(d, date));
};

const constructDateFromMonthAndDay = (baseMonth: Date, dayOfMonth: number): Date => {
	return new Date(baseMonth.getFullYear(), baseMonth.getMonth(), dayOfMonth);
};

type CalendarProps = {
	startDate: Date;
	endDate: Date;
	bankHolidays: Date[];
	daysOff: Date[];
};

const isWeekendDay = (date: Date) => {
	const day = date.getDay();
	return day === 0 || day === 6;
};

export const Calendar = ({ startDate, endDate, bankHolidays, daysOff = [] }: CalendarProps) => {
	const monthsInRange: Date[] = useMemo(() => generateMonthRange(startDate, endDate), [startDate, endDate]);
	const bankHolidaysInRange = useMemo(
		() => filterDatesInDateRange(bankHolidays, startDate, endDate),
		[startDate, endDate, bankHolidays]
	);

	const isDateBankHoliday = useCallback(
		(date: Date) => dateIsInArray(date, bankHolidaysInRange),
		[bankHolidaysInRange]
	);
	const isDateDayOff = useCallback((date: Date) => dateIsInArray(date, daysOff), [daysOff]);

	const getClassNamesForDate = useCallback(
		(date: Date) => {
			const classNames = [];
			if (isDateBankHoliday(date)) classNames.push("bankHoliday");
			if (isDateDayOff(date)) classNames.push("dayOff");
			if (isWeekendDay(date)) classNames.push("weekend");
			return classNames.join(" ");
		},
		[isDateBankHoliday, isDateDayOff]
	);

	return (
		<div className="calendar">
			{monthsInRange.map((month) => {
				return (
					<div key={`${month.toISOString()}-month`}>
						<h3 className="monthLabel">
							{month.toLocaleString("default", { month: "long" })} {month.getFullYear()}
						</h3>
						<div>
							<table>
								<tbody>
									<WeekdayHeaderRow />
									{splitArrayIntoChunks(generateMonthCalendarCells(month), DAYS_IN_WEEK).map((week, i) => {
										return (
											<tr key={`${month.toISOString()}-${i}-week`}>
												{week.map((day, i) => {
													const date = constructDateFromMonthAndDay(month, day);
													return (
														<td
															key={`${date.toISOString()}-${i}-day`}
															className={`day ${day ? getClassNamesForDate(date) : null}`}
														>
															{day}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				);
			})}
		</div>
	);
};
