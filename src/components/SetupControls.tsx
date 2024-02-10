import { SubmitHandler, useForm } from "react-hook-form";

export type SetupInputsSchema = {
	startDate: string;
	endDate: string;
	daysAvailable: number;
};

export const SetupControls = ({
	defaultStartDate,
	defaultEndDate,
	defaultDaysAvailable,
	onSubmit,
}: {
	defaultStartDate: Date;
	defaultEndDate: Date;
	defaultDaysAvailable: number;
	onSubmit: SubmitHandler<SetupInputsSchema>;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SetupInputsSchema>();

	return (
		<form className="setupControlsContainer" onSubmit={handleSubmit(onSubmit)}>
			<label className="setupControlInputContainer">
				<p>Start Date</p>
				<input
					type="date"
					defaultValue={defaultStartDate?.toLocaleDateString("sv")}
					{...register("startDate", { required: true })}
				/>
				{errors.startDate && <span>This field is required</span>}
			</label>
			<label className="setupControlInputContainer">
				<p>End Date</p>
				<input
					type="date"
					defaultValue={defaultEndDate?.toLocaleDateString("sv")}
					{...register("endDate", { required: true })}
				/>
				{errors.endDate && <span>This field is required</span>}
			</label>
			<label className="setupControlInputContainer">
				<p>Days Available</p>
				<input type="number" defaultValue={defaultDaysAvailable} {...register("daysAvailable", { required: true })} />
				{errors.daysAvailable && <span>This field is required</span>}
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};
