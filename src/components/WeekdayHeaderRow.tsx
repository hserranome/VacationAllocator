import { useMemo } from "react";

export const WeekdayHeaderRow = () => {
	const localizedWeekdayNames = useMemo(
		() =>
			Array.from({ length: 7 }, (_, dayIndex) => dayIndex).map((dayIndex) =>
				new Date(0, 0, dayIndex + 1).toLocaleString("default", { weekday: "short" })
			),
		[]
	);
	return (
		<tr className="flex">
			{localizedWeekdayNames.map((weekdayName) => (
				<th key={weekdayName} className="flex-1 font-medium text-gray-700">
					{weekdayName}
				</th>
			))}
		</tr>
	);
};
