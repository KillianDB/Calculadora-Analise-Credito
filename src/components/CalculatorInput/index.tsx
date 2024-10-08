import "./CalculatorInput.css";
import { Input, InputProps } from "antd";

export interface CalculatorInputProps extends InputProps {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
	label,
	...props
}) => {
	return (
		<div className='calculatorInputDiv'>
			<label>{label}</label>
			<Input {...props} />
		</div>
	);
};

export default CalculatorInput;
