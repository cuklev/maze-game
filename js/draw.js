const _draw = container => field_info => {
	const { length } = field_info;
	const borders = ['top', 'left', 'right', 'bottom'];
	const black_border = '1px solid black';

	for (let i = 0; i < length; ++i) {
		for (let j = 0; j < length; ++j) {
			const div = document.createElement('div');
			Object.assign(
				div.style,
				...field_info[i][j]
					.map((has_path, ix) => !has_path && {
						[`border-${borders[ix]}`]: black_border
					})
					.filter(Boolean)
			);
			container.appendChild(div);
		}
	}
	
};

const _fill = container => columns => (r, c) => {
	const element = container.children[r * columns + c];
	const color = element.style.backgroundColor || 'rgb(255, 0, 0)';

	const rgb = Array.of;
	const mask = eval(color).reduce((m, c, i) => m | (Boolean(c) << i), 0) + 1;
	const new_rgb = [0, 1, 2].map(i => (mask >> i & 1) * 255);

	element.style.backgroundColor = `rgb(${new_rgb.join(', ')})`;
};

const init_picasso = maze => {
	const container = document.getElementById('maze-container');
	return {
		fill: _fill(container)(maze[0].length),
		draw: _draw(container)
	};
};

