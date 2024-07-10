import "./CalculatorInput.css";

interface CalculatorInputProps {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
	label,
	onChange,
}) => {
	return (
		<div className='calculatorInputDiv'>
			<label>{label}</label>
			<input type='number' onChange={onChange}></input>
		</div>
	);
};

export default CalculatorInput;
