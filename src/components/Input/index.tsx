interface InputProps {
	label: string;
	type: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, onChange }) => {
	return (
		<div className='inputDiv'>
			<label>{label}</label>
			<input type={type} onChange={onChange}></input>
		</div>
	);
};

export default Input;
