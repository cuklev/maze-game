const _unit = unit => value => `${value}${unit}`;
const [_px, _pct] = [`px`, `%`].map(_unit);

const _draw = container => maze => {
	const borders = [`top`, `left`, `right`, `bottom`]
	const cell_size = (parseInt(container.clientWidth) / maze[0].length);
	container.style.minHeight = _px(maze.length * cell_size);
	const st = { minWidth: _pct(100 / maze[0].length), maxWidth: _pct(100 / maze[0].length) };
	const cell_pct_size = _pct(100 / maze[0].length);
	document.styleSheets[0].insertRule(`.maze-cell { max-width: ${cell_pct_size}; min-width: ${cell_pct_size} }`);

	for (let i = 0; i < maze.length; ++i) {
		const row = Object.assign(document.createElement(`div`), { className: `maze-row` });
		for (let j = 0; j < maze[i].length; ++j) {
			const className = maze[i][j]
				.map((has_path, ix) => !has_path && `wall-${borders[ix]}`)
				.filter(Boolean)
				.concat([`maze-cell`])
				.join(' ');
			const div = Object.assign(
				document.createElement(`div`),
				{ className }
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

