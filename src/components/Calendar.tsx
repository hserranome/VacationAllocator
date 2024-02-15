import { DateTime } from "luxon";
import { useCallback, useMemo } from "react";
import { WeekdayHeaderRow } from ".";
import { DAYS_IN_WEEK } from "../constants";

const generateYearMonths = (year: number): Date[] => {
	if (!year) return [];
	const months = Array.from({ length: 12 }).map((_, i) => new Date(year, i, 1));
	return months;
};

const generateMonthCalendarCells = (month: Date) => {
	const firstDayOfWeekIndex = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
	const firstDayOfWeek = firstDayOfWeekIndex === 0 ? 6 : firstDayOfWeekIndex - 1;

	const totalDaysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

	const lastDayOfWeekIndex = new Date(month.getFullYear(), month.getMonth(), totalDaysInMonth).getDay();
	const lastDayOfWeek = lastDayOfWeekIndex === 0 ? 6 : lastDayOfWeekIndex - 1;

	const calendarCells = [
		...Array.from({ length: firstDayOfWeek }).map(() => null),
		...Array.from({ length: totalDaysInMonth }).map((_, i) => i + 1),
		...Array.from({ length: 6 - lastDayOfWeek }).map(() => null),
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
	if (!dayOfMonth) return null;
	return new Date(baseMonth.getFullYear(), baseMonth.getMonth(), dayOfMonth);
};

const isWeekendDay = (date: Date | null) => {
	if (!date) return false;
	const day = date.getDay();
	return day === 0 || day === 6;
};

type CalendarProps = {
	year: number;
	publicHolidays: Date[];
	daysOff: Date[];
	maxDaysOff: number;
	onDayClick: (date: Date) => void;
};

export const Calendar = ({ year, publicHolidays, daysOff = [], onDayClick, maxDaysOff }: CalendarProps) => {
	const months: Date[] = useMemo(() => generateYearMonths(year), [year]);

	const isDatePublicHoliday = useCallback((date: Date) => dateIsInArray(date, publicHolidays), [publicHolidays]);
	const isDateDayOff = useCallback((date: Date) => dateIsInArray(date, daysOff), [daysOff]);
	const hasDaysToAllocate = useMemo(() => maxDaysOff > daysOff.length, [maxDaysOff, daysOff]);

	const getDateStyles = useCallback(
		(date: Date) => {
			const classNames = (() => {
				const baseClassNames = "";
				if (isDateDayOff(date)) return `${baseClassNames} bg-amber-500 text-white cursor-pointer`;
				if (isDatePublicHoliday(date)) return `${baseClassNames} bg-red-500 text-white `;
				if (isWeekendDay(date)) return `${baseClassNames} bg-gray-100 text-gray-700`;
				if (hasDaysToAllocate) return `${baseClassNames} cursor-pointer`;
				return `${baseClassNames} text-gray-700`;
			})();
			return `flex-1 ${classNames}`;
		},
		[isDatePublicHoliday, isDateDayOff, hasDaysToAllocate]
	);

	const allocatedDaysOff = useMemo(() => daysOff.length, [daysOff]);
	const publicHolidaysCount = useMemo(() => publicHolidays.length, [publicHolidays]);
	const remainingDaysOff = useMemo(() => maxDaysOff - allocatedDaysOff, [maxDaysOff, allocatedDaysOff]);

	const handleDayClick = useCallback((date: Date) => onDayClick(date), [onDayClick]);

	return (
		<div className=" bg-white p-12 rounded-lg shadow-md text-center w-auto ">
			<div className="mb-8 md:flex text-left">
				<div className="mr-8 mb-3 md:mb-0">
					<span className="font-semibold text-lg text-gray-700">Allocated days off:</span>
					<span className="p-1 ml-2 text-lg bg-amber-500 text-white">{allocatedDaysOff}</span>
				</div>
				<div className="mr-8 mb-3 md:mb-0">
					<span className="font-semibold text-lg text-gray-700">Remaining days off:</span>
					<span className="p-1 ml-2 text-lg bg-blue-400 text-white">{remainingDaysOff}</span>
				</div>
				<div className="mr-8 mb-3 md:mb-0">
					<span className="font-semibold text-lg text-gray-700">Bank holidays:</span>
					<span className="p-1 ml-2 text-lg bg-red-500 text-white">{publicHolidaysCount}</span>
				</div>
			</div>

			<div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8 gap-y-12">
				{months.map((month) => {
					return (
						<div key={`${month.toISOString()}-month`} className="">
							<h3 className="text-xl font-bold text-gray-700">
								{month.toLocaleString("default", { month: "long" })} {month.getFullYear()}
							</h3>
							<div className="mx-auto">
								<table className="w-full">
									<tbody>
										<WeekdayHeaderRow />
										{splitArrayIntoChunks(generateMonthCalendarCells(month), DAYS_IN_WEEK).map((week, i) => {
											return (
												<tr key={`${month.toISOString()}-${i}-week`} className="text-center flex">
													{week.map((day, i) => {
														const date = constructDateFromMonthAndDay(month, day);
														return (
															<td
																key={`${month.getMonth()}-${i}-day`}
																className={getDateStyles(date)}
																onClick={() => handleDayClick(date)}
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
		</div>
	);
};
