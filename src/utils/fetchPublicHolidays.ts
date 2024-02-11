export const fetchPublicHolidays = async (year: number, countryCode: string): Promise<Date[]> => {
	const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
	const data = await response.json();
	const holidays = data.map((holiday: { date: string }) => new Date(holiday.date));
	return holidays;
};
