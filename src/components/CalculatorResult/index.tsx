import "./CalculatorResult.css";

interface CalculatorProps {
	result: string;
}

export function CalculatorResult(result: CalculatorProps) {
	return <h2 className='calculatorResult'>{result.result}</h2>;
}
