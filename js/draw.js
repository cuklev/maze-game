const _px = value => `${value}px`;

const square = size => Object.assign(...['minWidth', 'minHeight', 'maxWidth', 'maxHeight'].map(key => ({ [key]: size })));

const _draw = container => maze => {
	const borders = ['top', 'left', 'right', 'bottom'];
	const black_border = '1px solid black';
	const cell_size = (parseInt(container.clientWidth) / maze[0].length);
	container.style.minHeight = _px(maze.length * cell_size);
	const st = square(_px(cell_size));

	for (let i = 0; i < maze.length; ++i) {
		for (let j = 0; j < maze[i].length; ++j) {
			const div = document.createElement('div');
			div.className = 'maze-cell';
			Object.assign(
				div.style,
				st,
				...maze[i][j]
					.map((has_path, ix) => !has_path && {
						[`border-${borders[ix]}`]: black_border
					})
					.filter(Boolean)
			);
			container.appendChild(div);
		}
	}
};

const _fill = (container, step = 255 / 10) => columns => (r, c) => {
	const element = container.children[r * columns + c];
	const color = element.style.backgroundColor || 'rgb(0, 255, 0)';

	const rgb = Array.of;
	const [_, green] = eval(color).map(v => Math.min(v - step, 255) | 0);

	element.style.backgroundColor = `rgb(${[0, green, 0].join(', ')})`;
};


const init_picasso = (container, maze) => ({
	fill: _fill(container)(maze[0].length),
	draw: _draw(container)
});
