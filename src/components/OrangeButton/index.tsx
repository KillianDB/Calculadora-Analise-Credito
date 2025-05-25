import "./OrangeButton.css";

interface ButtonProps {
	text: string;
	disabled?: boolean;
	onClick: () => unknown;
}

function OrangeButton({
	text,
	disabled,
	onClick,
}: ButtonProps) {
	const handleClick = () => {
		if (!disabled) {
			onClick();
		}
	};

	return (
		<button
			type='submit'
			className='orange-button'
			onClick={handleClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default OrangeButton;
