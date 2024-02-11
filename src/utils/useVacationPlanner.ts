import { useState, useEffect } from "react";
import { calculateDaysOff } from "./calculateDaysOff";
import { fetchPublicHolidays } from "./fetchPublicHolidays";

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
			const yearStart = new Date(parameters.year, 0, 1);
			const yearEnd = new Date(parameters.year, 11, 31);

			const countryCodePublicHolidays = await fetchPublicHolidays(parameters.year, parameters.countryCode);
			if (countryCodePublicHolidays) setPublicHolidays(countryCodePublicHolidays);

			try {
				const generatedDaysOff = await calculateDaysOff(
					yearStart,
					yearEnd,
					countryCodePublicHolidays,
					parameters.daysAvailable!
				);
				setDaysOff(generatedDaysOff);
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
