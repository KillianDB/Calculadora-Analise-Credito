import "./BlueButton.css";

interface ButtonProps {
	text: string;
	// disabled?: boolean;
	onClick: () => void;
}

function BlueButton({
	text,
	// disabled,
	onClick,
}: ButtonProps) {
	const handleClick = () => {
		// if (!disabled) {
		onClick();
		// }
	};

	return (
		<button
			type='submit'
			className='blue-button'
			onClick={handleClick}
			// disabled={disabled}
		>
			{text}
		</button>
	);
}

export default BlueButton;
