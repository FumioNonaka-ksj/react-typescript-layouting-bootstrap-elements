import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import ElementStyle from './ElementStyle';

type ChildStyle = {
	variant?: string,
	text?: string,
	size?: string,
};
const PushButton: React.FC<ElementStyle> = ({ itemStyle, selectedStyle, selectedItem, id, itemClicked }) => {
	const _style = {
		top: itemStyle.top,
		left: itemStyle.left,
	};
	const style = (selectedItem === id) ? {..._style, ...selectedStyle} : _style;
	const childStyle: ChildStyle = {
		variant: itemStyle.variant,
		text: itemStyle.text,
		size: itemStyle.size,
	};
	return (
		<div className="element" style={style} onClick={itemClicked}>
			<Button variant={childStyle.variant as ButtonProps['variant']} size={childStyle.size as ButtonProps['size']}>{childStyle.text}</Button>
		</div>
	);
};

export default PushButton;
