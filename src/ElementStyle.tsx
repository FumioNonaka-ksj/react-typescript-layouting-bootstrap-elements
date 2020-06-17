interface ElementStyle {
	itemStyle: {
		top: number,
		left: number,
		width?: number,
		height?: number,
		overflow?: string,
		fontSize?: number,
		fontWeight?: string,
		text?: string,
		strong?: boolean,
		placeholder?: string,
		size?: string,
		variant?: string,
	},
	selectedStyle?: object,
	selectedItem?: number,
	id?: string | number,
	itemClicked?: () => void,
}

export default ElementStyle;
