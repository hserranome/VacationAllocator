import { DateTime } from "luxon";

export const dateTimesToJSDates = (dates: DateTime[]): Date[] => {
	return dates.map((date) => date.startOf("day").toJSDate());
};
