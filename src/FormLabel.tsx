import React from 'react';
import { Form } from 'react-bootstrap';
import ElementStyle from './ElementStyle';

type ChildStyle = {
	border?: string,
	fontSize?: number,
}
const FormLabel: React.FC<ElementStyle> = ({ itemStyle, selectedStyle, selectedItem, id, itemClicked }) => {
	const _style = {
		top: itemStyle.top,
		left: itemStyle.left,
		overflow: itemStyle.overflow,
	};
	const style = (selectedItem === id) ? {..._style, ...selectedStyle} : _style;
	const childStyle: ChildStyle = {
		// border: '1px solid',
		fontSize: itemStyle.fontSize,
	};
		/* fontWeight: itemStyle.fontWeight,
	}; */
	return (
		<div className="element" style={style} onClick={itemClicked}>
			<Form.Label className="my-n1"><span style={childStyle}>
				{itemStyle.strong ? (<strong>{itemStyle.text}</strong>) : itemStyle.text}
			</span></Form.Label>
		</div>
	);
}

export default FormLabel;
