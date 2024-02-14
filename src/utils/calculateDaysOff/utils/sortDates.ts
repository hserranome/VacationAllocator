import { DateTime } from "luxon";

export const sortDates = (dates: DateTime[]): DateTime[] => {
	return dates.sort((a, b) => a.toMillis() - b.toMillis());
};
