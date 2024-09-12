/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactNode } from "react";
import "./SubmitCard.css";

interface SubmitCardProps {
	title?: string;
	inputs: {
		label: string;
		name: string;
		type: string;
		value: string;
		onChange?:
			| ((
					event:
						| React.ChangeEvent<HTMLInputElement>
						| React.ChangeEvent<HTMLSelectElement>
			  ) => void)
			| undefined;
		options?: string[];
	}[];
	button: ReactNode;
}

export default function SubmitCard({ title, inputs, button }: SubmitCardProps) {
	const isGrid = inputs.length > 5;
	return (
		<div className='submit-div'>
			<h3>{title}</h3>
			<section
				className={`submit-input-section ${
					isGrid ? "submit-grid-layout" : ""
				}`}
			>
				{inputs.map((input, index) => (
					<div key={index} className='submit-input-div'>
						<label>{input.label}</label>
						{input.type !== "select" ? (
							<input
								name={input.name}
								type={input.type}
								value={input.value}
								onChange={input.onChange}
							/>
						) : (
							input.options && (
								<select
									name={input.name}
									value={input.value}
									onChange={input.onChange}
								>
									{input.options.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							)
						)}
					</div>
				))}
			</section>
			{button}
		</div>
	);
}
