import React from 'react';

type Props = {
	layoutAreaWidth: number,
	alpha: number,
	boxSize: number,
	boxCount: number,
};
const Grid: React.FC<Props> = ({ layoutAreaWidth, alpha, boxSize, boxCount }) => {
	return (
		<div id="grid" className="m-0 p-0 d-flex flex-wrap" style={{ width: layoutAreaWidth }}>
			{Array.from(new Array(boxCount), (element, id) =>
				<div className="border border-primary border-left-0 border-top-0" style={{ width: boxSize, height: boxSize, opacity: alpha }} key={id}></div>
			)}
		</div>
	);
};

export default Grid;
