import { SubmitHandler, useForm } from "react-hook-form";
import { useMemo } from "react";
import { INITIAL_PARAMETERS } from "../constants";

const DEFAULT_VALUES = {
	year: INITIAL_PARAMETERS.year,
	daysAvailable: INITIAL_PARAMETERS.daysAvailable,
	countryCode: INITIAL_PARAMETERS.countryCode,
};

export type SetupInputsSchema = {
	year: number;
	daysAvailable: number;
	countryCode: string;
};

const Input = ({ label, type, register, error, name, options }) => {
	const inputClassNames = useMemo(() => {
		const typeClassNames = {
			checkbox: "w-5 h-5",
			date: "w-48",
			number: "w-48",
		};
		return `text-sm rounded-lg block py-2 px-4 border border-gray-400 ${typeClassNames[type]}`;
	}, [type]);

	return (
		<div className="mb-2">
			<label>
				<p className="font-medium text-base mb-1">{label}</p>
				<input className={inputClassNames} type={type} {...register(name, options)} />
				{error && <span className="text-red-500 text-sm">This field is required</span>}
			</label>
		</div>
	);
};

export const SetupControls = ({ onSubmit }: { onSubmit: SubmitHandler<SetupInputsSchema> }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SetupInputsSchema>({
		defaultValues: DEFAULT_VALUES,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Year"
				type="number"
				register={register}
				name="year"
				options={{ required: true, min: 2000, max: 2030 }}
				error={errors.year}
			/>
			<Input
				label="Days Available"
				type="number"
				register={register}
				name="daysAvailable"
				options={{ required: true }}
				error={errors.daysAvailable}
			/>
			<Input
				label="Country Code"
				type="string"
				register={register}
				name="countryCode"
				options={{ required: true }}
				error={errors.countryCode}
			/>
			<div className="mt-5">
				<input type="submit" value="Submit" className="bg-blue-500 text-white rounded-lg py-2 px-6" />
			</div>
		</form>
	);
};
