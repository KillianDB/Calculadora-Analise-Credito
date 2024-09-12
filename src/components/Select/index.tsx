import React from "react";
import "./Select.css";

interface SelectProps {
	options: { value: string; label: string }[];
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ options, onChange }: SelectProps) {
	return (
		<select onChange={onChange} className='selectDiv'>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
