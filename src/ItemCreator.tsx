import React from 'react';
import {
	ButtonGroup,
	Button,
} from 'react-bootstrap';

const itemProps = [
	{componentName: 'FormLabel', iconClass: 'fa-newspaper'},
	{componentName: 'FormControl', iconClass: 'fa-edit'},
	{componentName: 'Button', iconClass: 'fa-arrow-alt-circle-down'},
];
type Props = {
	itemCreated: (componentName: string) => void,
};
const ItemCreator: React.FC<Props> = ({itemCreated}) => {
	const createItem = (componentName: string) => {
		itemCreated(componentName);
	};
	return (
		<div className="d-flex align-items-start mx-1">
			<ButtonGroup vertical>
				{itemProps.map((itemProp, id) => (
					<Button className="mb-1" variant="outline-primary" onClick={() => createItem(itemProp.componentName)} key={id}><i className={'far ' + itemProp.iconClass}></i></Button>
				))}
			</ButtonGroup>
		</div>
	);
};

export default ItemCreator;