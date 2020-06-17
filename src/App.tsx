import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import LayoutElements from './LayoutElements'
import PropertyInspector from './PropertyInspector'
import FormLabel from './FormLabel';
import FormControl from './FormControl';
import Button from './PushButton';
import ItemCreator from './ItemCreator';
import ElementStyle from './ElementStyle';
import Grid from './Grid';
import './App.css';

const itemsDefault = {
	Button: {
		component: Button,
		itemStyle: {
			top: 0,
			left: 0,
			variant: 'primary',
			text: 'Button Text',
			size: null,
		},
	},
	FormLabel: {
		component: FormLabel,
		itemStyle: {
			top: 0,
			left: 0,
			fontSize: 24,
			text: 'Label Text',
		},
	},
	FormControl: {
			component: FormControl,
			itemStyle: {
				top: 0,
				left: 0,
				placeholder: 'Enter text',
				size: 'lg',
			},
	},
};
const layoutAreaStyle = {
	overflow: 'hidden',
	height: 700,
};
function App() {
	const _items = [
		{
			component: FormLabel,
			itemStyle: {
				top: 150,
				left: 70,
				overflow: 'hidden',
				fontSize: 48,
				text: 'Label Text',
				strong: true,
			},
		},
		{
			component: FormControl,
			itemStyle: {
				top: 160,
				left: 300,
				width: 225,
				size: 'lg',
				placeholder: 'Enter text',
			},
		},
		{
			component: Button,
			itemStyle: {
				top: 75,
				left: 70,
				variant: 'success',
				text: 'Button Text',
				size: 'lg',
			},
		},
	];
	const [items, setItems] = useState(_items);
	const [pos, setPos] = useState({ left: '', top: ''} as { left?: number | string, top?: number | string});
	const [width, setWidth] = useState(0 as number | string | undefined);
	const [text, setText] = useState('' as string | undefined);
	const [fontSize, setFontSize] = useState(0 as number | string | undefined);
	const [fontStrong, setFontStrong] = useState(false as boolean | undefined);
	const [selectedItem, setSelectedItem] = useState(-1);
	const [selectedComponent, setSelectedComponent] = useState('' as string | undefined);
	const [layoutAreaSize, setLayoutAreaSize] = useState({width: 0, height: 0});
	const [showGrid, setShowGrid] = useState(true);
	const [gridAlpha, setGridAlpha] = useState(40);
	const [boxSize, setBoxSize] = useState(20);
	const [layoutAreaWidth, setLayoutAreaWidth] = useState(boxSize);
	const [boxCount, setBoxCount] = useState(0);
	const resetBoxCount = useCallback(
		(width: number, height: number) => {
			if (boxSize < 10) { return; }
			const _boxSize = boxSize;
			const offset = 1;
			const countX = Math.floor(width / _boxSize) + offset;
			const countY = Math.floor(height / _boxSize) + offset;
			setBoxCount(countX * countY);
			},
		[boxSize],
	);
	const resetLayoutArea = useCallback(
		(layoutArea: HTMLElement) => {
			const width = layoutArea.clientWidth;
			const height = layoutArea.clientHeight;
			setLayoutAreaSize({width: width, height: height});
			setLayoutAreaWidth(width + boxSize);
			resetBoxCount(width, height);
		},
		[boxSize, resetBoxCount],
	)
	useEffect(() => {
		const layoutArea = document.getElementById('layout-area') as HTMLElement;
		resetLayoutArea(layoutArea);
		window.addEventListener('resize', (event) =>
			resetLayoutArea(layoutArea)
		);
		/* return () => {
			cleanup
		} */
	}, [resetLayoutArea]);
	const getComponentName = (component: React.FC<ElementStyle>) => {
		switch (component) {
			case FormLabel: 
				return 'FormLabel';
			case FormControl:
				return 'FormControl';
			case Button:
				return 'Button';
			default:
				return undefined;
		}
	}
	const itemCreated = (componentName: string) => {
		const item = (itemsDefault as any)[componentName];
		const id = items.length;
		setSelectedComponent(componentName);
		selectItem(id, componentName, item.itemStyle);
		setItems([...items, item]);
	};
	const itemClicked = (id: number, component: React.FC<ElementStyle>) => {
		const _items = [...items];
		const _itemStyle = _items[id].itemStyle;
		const componentName = getComponentName(component);
		setSelectedComponent(componentName);
		selectItem(id, componentName as string, _itemStyle)
	};
	const selectItem = (id: number, componentName: string, itemStyle: ElementStyle['itemStyle']) => {
		setSelectedItem(id);
		setPos({
			left: itemStyle.left,
			top: itemStyle.top,
		});
		if (componentName === 'FormControl') {
			setWidth(itemStyle.width);
		}
		const text = (componentName === 'FormControl') ? itemStyle.placeholder : itemStyle.text;
		if (componentName === 'FormLabel') {
				setFontSize(itemStyle.fontSize);
				setFontStrong(itemStyle.strong);
		}
		setText(text);
	};
	const propsChanged = (pos: {left?: number, top?: number}) => {
		if (!pos) { return; }
		const _items = [...(items as ElementStyle[])];
		if (selectedItem > -1) {
			_items[selectedItem].itemStyle.left = pos.left as number;
			_items[selectedItem].itemStyle.top = pos.top as number;
		}
		setPos(pos);
	};
	const widthChanged = (width?: number) => {
		const _items = [...(items as ElementStyle[])];
		if (selectedItem > -1) {
			_items[selectedItem].itemStyle.width = width;
		}
		setWidth(width);
	};
	const variantChanged = (eventKey: string) => {
		const _items = [...items];
		if (selectedItem > -1) {
			_items[selectedItem].itemStyle.variant = eventKey;
			setItems(_items);
		}
	};
	const sizeChanged = (eventKey: string) => {
		const _items = [...items];
		if (selectedItem > -1) {
			_items[selectedItem].itemStyle.size = eventKey;
			setItems(_items);
		}
	}
	const textChanged = (text: string | undefined) => {
		const _items = [...items];
		if (selectedItem > -1) {
			if (selectedComponent === 'FormControl') {
				_items[selectedItem].itemStyle.placeholder = text;
			} else {
				_items[selectedItem].itemStyle.text = text;
			}
			setText(text);
		}
	};
	const fontSizeChanged = (size: number) => {
		const _items = [...items];
		if (selectedItem > -1) {
			if (selectedComponent === 'FormLabel') {
				_items[selectedItem].itemStyle.fontSize = size;
			}
		}
		setFontSize(size);
	};
	const fontStrongChanged = (flag: boolean | undefined) => {
		const _items = [...items];
		if (selectedItem > -1) {
			if (selectedComponent === 'FormLabel') {
				_items[selectedItem].itemStyle.strong = flag;
			}
			setFontStrong(flag);
		}
	};
	const removeItem = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (selectedItem < 0) { return; }
		const _items = items.filter((item, id) => id !== selectedItem);
		setItems(_items);
		clearInspector();
		setSelectedItem(-1);
	};
	const layoutAreaClicked = (event: React.MouseEvent<HTMLElement>) => {
		const target = event.target as HTMLElement;
		const id = target.getAttribute('id');
		const parentId = target.parentElement?.getAttribute('id');
		if (id === 'layout-area' || id === 'grid'|| parentId === 'grid') {			
			clearInspector();
			setSelectedItem(-1);
		}
	};
	const clearInspector = () => {
		setText('');
		setPos({left: '', top: ''});
		setSelectedComponent(undefined);
	};
	const changeBoxSize = (size: number) => {
		size = (Number.isNaN(size) || size < 10) ? 10 : size;
		setBoxSize(size);
		const width = layoutAreaSize.width || 0;
		const height = layoutAreaSize.height || 0;
		setLayoutAreaWidth(width + boxSize);
		resetBoxCount(width, height);
	}
	return (
		<div className="App">
			<Container className="my-1">
				<PropertyInspector
					pos={pos}
					text={text}
					width={width}
					fontSize={fontSize}
					fontStrong={fontStrong}
					selectedComponent={selectedComponent}
					propsChanged={(pos) => propsChanged(pos)}
					widthChanged={(width) => widthChanged(width)}
					variantChanged={variantChanged}
					sizeChanged={sizeChanged}
					textChanged={textChanged}
					fontSizeChanged={fontSizeChanged}
					fontStrongChanged={fontStrongChanged}
					removeItem={removeItem}
					showGrid={showGrid}
					setShowGrid={setShowGrid}
					gridAlpha={gridAlpha}
					setGridAlpha={setGridAlpha}
					boxSize={boxSize}
					changeBoxSize={changeBoxSize}
				/>
			</Container>
			<div className="d-flex">
				<ItemCreator itemCreated={itemCreated} />
				<Container id="layout-area" onClick={layoutAreaClicked} className="p-0" style={layoutAreaStyle}>
					{showGrid ?
					<Grid
						layoutAreaWidth={layoutAreaWidth}
						alpha={gridAlpha / 100}
						boxSize={boxSize}
						boxCount={boxCount}
					/>
					: null}
					<LayoutElements items={items} selectedItem={selectedItem} itemClicked={itemClicked} />
				</Container>
			</div>
		</div>
	);
}

export default App;
