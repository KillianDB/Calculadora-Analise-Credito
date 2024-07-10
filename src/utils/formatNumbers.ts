export function formatNumber(number: number) {
	const [integerPart, decimalPart] = number.toFixed(2).split(".");

	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		"."
	);

	return `${formattedIntegerPart},${decimalPart}`;
}
