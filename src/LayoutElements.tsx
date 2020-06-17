import React from 'react';
import ElementStyle from './ElementStyle';

type Component = {
	component: React.FC<ElementStyle>,
};
type Props = {
	items: (ElementStyle & Component)[],
	itemClicked: (id: number, component: React.FC<ElementStyle>) => void,
	selectedItem: number,
};
const LayoutElements: React.FC<Props> = ({ items, selectedItem, itemClicked }) => {
	const selectedStyle = {
		border: '1px solid rgba(0, 0, 255, 0.6)',
		boxShadow: '0 0 10px rgba(0, 0, 255, 0.8)',
	};
	return (
		<>
			{items.map((item, id) => {
				const Component = item.component;
				return (
					<Component key={id} id={id}
						itemStyle={item.itemStyle}
						selectedStyle={selectedStyle}
						selectedItem={selectedItem}
						itemClicked={() => itemClicked(id, Component)}
					/>
				);
			})}
		</>
	);
}

export default LayoutElements;
