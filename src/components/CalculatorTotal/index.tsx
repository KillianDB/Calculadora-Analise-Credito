import "./CalculatorTotal.css";

function CalculatorTotal({ total }: { total: string }) {
	return <h2 className='calculatorTotalDiv'>{total}</h2>;
}

export default CalculatorTotal;
