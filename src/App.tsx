import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ACTUAL_DATE, BANK_HOLIDAYS } from "./constants";
import { Calendar, SetupControls } from "./components";
import { DateTime, Interval } from "luxon";

const calculateDaysOff = async (
	startDate: Date,
	endDate: Date,
	bankHolidays: Date[],
	daysToAllocate: number
	// weekendsFree = true
): Promise<Date[]> => {
	const intervalStart = DateTime.fromJSDate(startDate);
	const intervalEnd = DateTime.fromJSDate(endDate);
	const fullRangeInterval = Interval.fromDateTimes(intervalStart, intervalEnd);

	const weekendDays = fullRangeInterval
		.splitBy({ days: 1 })
		.filter((day) => day.start.weekday > 5)
		.map((d) => d.start);

	const bankHolidaysDates = bankHolidays
		.map((date) => DateTime.fromJSDate(date))
		.filter((date) => fullRangeInterval.contains(date));

	const forcedDaysOff = [...weekendDays, ...bankHolidaysDates].sort((a, b) => a.toMillis() - b.toMillis());
	const daysForPairs = [intervalStart.minus({ days: 1 }), ...forcedDaysOff, intervalEnd.plus({ days: 1 })];

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
			const datesToAllocate = dates.slice(0, remainingDays);
			return [...acc, ...datesToAllocate];
		}, [])
		.sort((a, b) => a.toMillis() - b.toMillis());

	return datesToAllocate.map((d) => d.toJSDate());
};

const App = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [parameters, setParameters] = useState<{
		startDate: Date;
		endDate: Date;
		daysAvailable: number;
	}>(null);
	const [daysOff, setDaysOff] = useState<Date[]>([]);

	const handleSubmit = async (data) => {
		setLoading(true);
		setParameters({
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
			daysAvailable: data.daysAvailable,
		});
	};

	useEffect(() => {
		(async () => {
			const generatedDaysOff = await calculateDaysOff(
				parameters?.startDate,
				parameters?.endDate,
				BANK_HOLIDAYS,
				parameters?.daysAvailable
			);
			setDaysOff(generatedDaysOff);
			setLoading(false);
			return;
		})();
	}, [parameters]);

	const allocatedDaysOff = useMemo(() => daysOff.length, [daysOff]);

	const shouldShowCalendar = !loading && parameters?.startDate && parameters?.endDate && parameters?.daysAvailable;

	return (
		<div>
			<div>
				<SetupControls
					defaultStartDate={new Date(ACTUAL_DATE.getFullYear(), 0, 1)}
					defaultEndDate={new Date(ACTUAL_DATE.getFullYear(), 11, 31)}
					defaultDaysAvailable={20}
					onSubmit={handleSubmit}
				/>
			</div>
			<div>Allocated days off: {allocatedDaysOff}</div>
			<div>
				{shouldShowCalendar && (
					<Calendar
						startDate={parameters?.startDate}
						endDate={parameters?.endDate}
						bankHolidays={BANK_HOLIDAYS}
						daysOff={daysOff}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
