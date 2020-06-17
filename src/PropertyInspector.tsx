import React, { ChangeEvent } from 'react';
import {
	Form,
	DropdownButton,
	Dropdown,
	ButtonGroup,
	ToggleButton,
	Button,
	ToggleButtonProps,
} from 'react-bootstrap';

type Props = {
	pos: {
		left?: number | string,
		top?: number | string,
	},
	width: number | string | undefined,
	text: string | undefined,
	fontSize?: number | string,
	fontStrong?: boolean,
	propsChanged: (pos: {left?: number, top?: number}) => void,
	widthChanged: (width?: number) => void,
	selectedComponent: string | undefined,
	variantChanged: (eventKey: string) => void,
	sizeChanged: (eventKey: string) => void,
	textChanged: (text: string | undefined) => void,
	fontSizeChanged: (size: number) => void,
	fontStrongChanged: (flag: boolean | undefined) => void,
	removeItem: (event: React.MouseEvent<HTMLButtonElement>) => void,
	showGrid: boolean,
	setShowGrid: (show: boolean) => void,
	gridAlpha: number,
	setGridAlpha: (alpha: number) => void,
	boxSize: number,
	changeBoxSize: (size: number) => void,
};
const PropertyInspector: React.FC<Props> = ({
	pos,
	text,
	width,
	fontSize,
	fontStrong,
	selectedComponent,
	propsChanged,
	widthChanged,
	variantChanged,
	sizeChanged,
	textChanged,
	fontSizeChanged,
	fontStrongChanged,
	removeItem,
	showGrid,
	setShowGrid,
	gridAlpha,
	setGridAlpha,
	boxSize,
	changeBoxSize,
}) => {
	const variantSelections = [
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
		'dark',
		'light',
		'link',
		'outline-primary',
		'outline-secondary',
		'outline-success',
		'outline-danger',
		'outline-warning',
		'outline-info',
		'outline-dark',
		'outline-light'
	];	
	const posChanged = (event: ChangeEvent) => {
		const target = (event.target as HTMLInputElement);
		const value = target.value;
		const posId = target.getAttribute('id');
		const _pos = {...pos} as { left: number, top: number};
		target.value = value;
		switch (posId) {
			case 'pos-left':
				_pos.left = +value;
				break;
			case 'pos-top':
				_pos.top = +value;
				break;
		}
		propsChanged(_pos);
	};
	const changeWidth = (event: ChangeEvent) => {
		const target = (event.target as HTMLInputElement);
		const value = +target.value;
		widthChanged(value);
	};
	const inputTextChanged = (event: ChangeEvent) => {
		const target = (event.target as HTMLInputElement);
		const value = target.value;
		textChanged(value);
	};
	const labelFontSizeChanged = (event: ChangeEvent) => {
		const target = (event.target as HTMLInputElement);
		const value = parseInt(target.value);
		fontSizeChanged(value);
	};
	const labelFontStrongChanged = (event: ChangeEvent<ToggleButtonProps>) => {
		const target = event.target as ToggleButtonProps;
		fontStrongChanged(Boolean(target.checked));
	}
	const toggleGrid = (event: ChangeEvent) => {
		const target = event.currentTarget as HTMLInputElement;
		const checked: boolean = target.checked;
		setShowGrid(checked);
	};
	const changeGridAlpha = (event: ChangeEvent) => {
		const target = event.currentTarget as HTMLInputElement;
		const alpha: number = parseInt(target.value);
		setGridAlpha(alpha);
	};
	const boxSizeChanged = (event: ChangeEvent) => {
		const target = event.currentTarget as HTMLInputElement;
		const size: number = parseInt(target.value);
		changeBoxSize(size);
	};
	return (
		<>
		<div className="d-flex align-items-center">
			<Form.Label>left</Form.Label>
			<Form.Control id="pos-left" type="number" min="0" value={pos.left} onChange={posChanged} className="mr-1" style={{width: 75}} />
			<Form.Label>top</Form.Label>
			<Form.Control id="pos-top" type="number" min="0" value={pos.top} onChange={posChanged} className="mr-1" style={{width: 75}} />
			{selectedComponent === 'FormControl' ? (
				<>
					<Form.Label>width</Form.Label>
					<Form.Control id="width" type="number" min="0" value={width} onChange={changeWidth} className="mr-1" style={{width: 75}} />
				</>
			): null}
			<Form.Label>text</Form.Label>
			<Form.Control id="text" type="text" value={text as string | undefined} onChange={inputTextChanged} className="mr-1" />
			<div className="d-flex">
			{selectedComponent === 'Button' ? (
			<DropdownButton
				id="variant"
				title="variant"
				variant="outline-primary"
				size="sm"
				className="mr-1"
			>
				{variantSelections.map(variant => (
					<Dropdown.Item
						eventKey={variant}
						key={variant}
						onSelect={variantChanged}
					>
						{variant}
					</Dropdown.Item>
				))}
			</DropdownButton>
			) : null}
			{selectedComponent === 'Button' || selectedComponent === 'FormControl' ? (
			<DropdownButton
				id="size"
				title="size"
				variant="outline-primary"
				size="sm"
				className="mr-1"
			>
				<Dropdown.Item eventKey="lg" onSelect={sizeChanged}>
					large
				</Dropdown.Item>
				<Dropdown.Item eventKey={undefined} onSelect={sizeChanged}>
					medium
				</Dropdown.Item>
				<Dropdown.Item eventKey="sm" onSelect={sizeChanged}>
					small
				</Dropdown.Item>
			</DropdownButton>
			) : null}
			</div>
			{selectedComponent === 'FormLabel' ?
			<>
				<Form.Label className="my-0" style={{lineHeight: '1.2rem'}}>font size</Form.Label>
				<Form.Control id="font-size" type="number" min="0" value={fontSize} onChange={labelFontSizeChanged} className="mr-1" style={{width: 75}} />
				<ButtonGroup toggle className="mr-1">
					<ToggleButton
						type="checkbox"
						variant="outline-primary"
						checked={fontStrong}
						value="1"
						size="sm"
						onChange={labelFontStrongChanged}
						><strong>B</strong></ToggleButton>
				</ButtonGroup>
			</>:
			null}
			<Button variant="outline-danger" size="sm" onClick={removeItem}><i className="far fa-trash-alt"></i></Button>
		</div>
		<div>
			<Form>
				<Form.Group className="d-flex align-items-center mb-0">
					<Form.Check id="toggle-grid" type="checkbox" label="grid" className="mr-2" checked={showGrid} onChange={toggleGrid} />
					{showGrid ? (
					<>
						<Form.Control type="range" onChange={changeGridAlpha} value={gridAlpha} />
						<Form.Label className="ml-1">box</Form.Label>
						<Form.Control id="box-size" type="number" min="10" max="100" value={boxSize} onChange={boxSizeChanged} style={{width: 75}} />
					</>
					): null}
				</Form.Group>
			</Form>
		</div>
		</>
	);
};

export default PropertyInspector;
