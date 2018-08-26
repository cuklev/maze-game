const _unit = unit => value => `${value}${unit}`;
const [_px, _pct] = [`px`, `%`].map(_unit);

const _draw = container => maze => {
	const borders = [`top`, `left`, `right`, `bottom`];
	const black_border = `1px solid black`;
	const cell_size = (parseInt(container.clientWidth) / maze[0].length);
	container.style.minHeight = _px(maze.length * cell_size);
	const st = { minWidth: _pct(100 / maze[0].length), maxWidth: _pct(100 / maze[0].length) };

	for (let i = 0; i < maze.length; ++i) {
		const row = document.createElement(`div`);
		row.className = `maze-row`;
		for (let j = 0; j < maze[i].length; ++j) {
			const div = document.createElement(`div`);
			div.className = `maze-cell`;
			Object.assign(
				div.style,
				st,
				...maze[i][j]
					.map((has_path, ix) => !has_path && {
						[`border-${borders[ix]}`]: black_border
					})
					.filter(Boolean)
			);
			row.appendChild(div);
		}
		container.appendChild(row);
	}
};

const _fill = (container, step = 255 / 10) => columns => (r, c) => {
	const element = container.children[r].children[c];
	const color = element.style.backgroundColor || `rgb(0, 255, 0)`;

	const rgb = Array.of;
	const [_, green] = eval(color).map(v => Math.min(v - step, 255) | 0);

	element.style.backgroundColor = `rgb(${[0, green, 0].join(`, `)})`;
};

const init_picasso = (container, maze) => ({
	fill: _fill(container)(maze[0].length),
	draw: _draw(container)
});

