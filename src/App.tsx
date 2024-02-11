import "./App.css";
import { INITIAL_PARAMETERS } from "./constants";
import { Calendar, SetupControls } from "./components";
import { useVacationPlanner } from "./utils";
import { useMemo } from "react";

const App = () => {
	const { loading, parameters, setParameters, daysOff, setDaysOff, publicHolidays } =
		useVacationPlanner(INITIAL_PARAMETERS);

	const handleDayClick = (date: Date) => {
		setDaysOff((prev) => {
			if (prev.some((d) => d.toISOString() === date.toISOString())) {
				return prev.filter((d) => d.toISOString() !== date.toISOString());
			}
			if (prev.length >= parameters.daysAvailable) return prev;
			return [...prev, date];
		});
	};

	const shouldShowCalendar = useMemo(
		() => !loading && parameters.year && parameters.daysAvailable && parameters.countryCode && daysOff,
		[loading, parameters, daysOff]
	);

	return (
		<div className="bg-red-50 p-8 text-gray-700 min-h-screen h-fit pb-28">
			<div className="container mx-auto pt-24 px-4 mb-12 text-left max-w-3xl">
				<div>
					<h1 className="text-4xl font-bold text-gray-700	mb-8">Vacation Planner</h1>
					<div className="mb-8 font-medium text-gray-700">
						<p>
							Enter the data to get a distribution of days off so we have as many consecutive days off as possible,
							while using the less amount of given available days.
						</p>
					</div>
				</div>

				<div className="border-b-2 border-zinc-800/10 mb-8"></div>

				<div className="mb-8">
					<SetupControls
						onSubmit={(data) =>
							setParameters({
								year: data.year,
								daysAvailable: data.daysAvailable,
								countryCode: data.countryCode,
							})
						}
					/>
				</div>
			</div>
			<div className="container mx-auto max-w-3xl">
				<div>
					{shouldShowCalendar && (
						<Calendar
							year={parameters?.year}
							publicHolidays={publicHolidays}
							daysOff={daysOff}
							onDayClick={handleDayClick}
							maxDaysOff={parameters.daysAvailable}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
