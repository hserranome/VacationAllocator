import { DateTime } from "luxon";

export const datesToDatetime = (dates: Date[]): DateTime[] => {
	return dates.map((date) => DateTime.fromJSDate(date));
};
