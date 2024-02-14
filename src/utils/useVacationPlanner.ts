import { useState, useEffect } from "react";
import { calculateDaysOff } from "./calculateDaysOff/calculateDaysOff";
import { fetchPublicHolidays } from "./fetchPublicHolidays";
import { DateTime } from "luxon";
import { dateTimesToJSDates, datesToDatetime } from ".";

interface Parameters {
	year: number;
	daysAvailable: number | null;
	countryCode: string;
}

export const useVacationPlanner = (initialParameters: Parameters) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [parameters, setParameters] = useState<Parameters>(initialParameters);
	const [publicHolidays, setPublicHolidays] = useState<Date[]>([]);
	const [daysOff, setDaysOff] = useState<Date[]>([]);

	useEffect(() => {
		const fetchDaysOff = async () => {
			setLoading(true);

			const countryCodePublicHolidays = await fetchPublicHolidays(parameters.year, parameters.countryCode);
			if (countryCodePublicHolidays) setPublicHolidays(countryCodePublicHolidays);

			try {
				const yearStart = DateTime.local(parameters.year, 1, 1);
				const yearEnd = DateTime.local(parameters.year, 12, 31);
				const forcedDaysOff = datesToDatetime(publicHolidays);

				const generatedDaysOff = await calculateDaysOff(yearStart, yearEnd, forcedDaysOff, parameters.daysAvailable!);
				setDaysOff(dateTimesToJSDates(generatedDaysOff));
			} catch (error) {
				console.error("Failed to calculate days off", error);
				// @todo: Handle error appropriately
			} finally {
				setLoading(false);
			}
		};

		if (parameters.year && parameters.daysAvailable) {
			fetchDaysOff();
		}
	}, [parameters]);

	return { loading, parameters, setParameters, daysOff, setDaysOff, publicHolidays, setPublicHolidays };
};
