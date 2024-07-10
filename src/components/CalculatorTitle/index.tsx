import "./CalculatorTitle.css";

interface TitleProps {
	menu: string;
	submenu: string;
}

export const CalculatorTitle: React.FC<TitleProps> = ({ menu, submenu }) => {
	return (
		<h2 className='textCalculatorTitle'>
			{menu} - {submenu}
		</h2>
	);
};
