import React from 'react';
import { Form } from 'react-bootstrap';
import ElementStyle from './ElementStyle';

type ChildStyle = {
	border?: string,
	size?: string,
	placeholder?: string,
};
type size = 'lg' | 'sm';
const FormControl: React.FC<ElementStyle> = ({ itemStyle, selectedStyle, selectedItem, id, itemClicked }) => {
	const _style = {
		top: itemStyle.top,
		left: itemStyle.left,
		width: itemStyle.width,
	};
	const style = (selectedItem === id) ? {..._style, ...selectedStyle} : _style;
	const childStyle: ChildStyle = {
		border: '1px solid',
		size: itemStyle.size,
		placeholder: itemStyle.placeholder,
	};
	const getFormControl = () => {
		if (style.width) {
			if (childStyle.size) {
				return (
					<Form.Control type="text" size={childStyle.size as size} placeholder={childStyle.placeholder} style={{width: style.width, border: childStyle.border}} /> 
				);
			} else {
				return (
					<Form.Control type="text" placeholder={childStyle.placeholder} style={{width: style.width, border: childStyle.border}} />
				);
			}
		} else {
			if (childStyle.size) {
				return (
					<Form.Control type="text" size={childStyle.size as size} placeholder={childStyle.placeholder} style={{border: childStyle.border}} />
				);
			} else {
				return (
					<Form.Control type="text" placeholder={childStyle.placeholder} style={{border: childStyle.border}} />
				);
			}
		}
	}
	return (
		<div className="element" style={style} onClick={itemClicked}>
			{getFormControl()}
		</div>
	);
};

export default FormControl;