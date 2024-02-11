# VacationAllocator

VacationAllocator is a React application designed to help users plan their vacation time allocation in a time. It takes into account weekends and public holidays (currently hard coded) to ensure that the allocated days off are distributed evenly throughout the year.

## Features

- **Date Range Selection**: Users can input a start and end date to define the period for which they want to allocate vacation days.
- **Public Holidays**: The application considers public holidays as non-working days and excludes them from the vacation allocation.
- **Weekends Off**: By default, weekends are considered as days off and are not included in the vacation allocation.
- **Customizable Days Available**: Users can specify how many days they have available for vacation, and the application will distribute these days accordingly.
- **Visual Calendar**: Once the vacation days are calculated, a visual calendar displays the allocated days off, allowing users to see their vacation schedule at a glance.

## Future Improvements

- **Set custom public holidays**: Allow users to set their own public holidays.
- **Customizable weekends**: Allow users to specify which days are considered weekends, if any.
- **Better UI/UX**: Improve the user interface and experience to make the application more intuitive and user-friendly.
- **Better allocation of days off**: Improve the algorithm for allocating days off to ensure that they are distributed as evenly as possible throughout the year. For example, prioritize longer vacation periods over shorter ones.
- **Change allocated days off**: Allow users to change the allocated days off manually, if necessary.

## Usage

1. Open the application in a web browser.
2. Enter the desired start and end dates for the vacation period.
3. Specify the number of days available for vacation.
4. Click the submit button to calculate the vacation days.
5. View the allocated days off on the calendar.

## Development

To run the application locally for development purposes, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm start`.

## Contributing

Contributions are welcome! Please feel free to open issues or pull requests to improve the application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.