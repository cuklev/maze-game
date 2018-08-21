const draw = field_info => {
	const { length } = field_info;
	const container = document.getElementById('maze-container');

	for (let i = 0; i < length; ++i) {
		for (let j = 0; j < length; ++j) {
			const div = document.createElement('div');
			const borders = ['top', 'left', 'right', 'bottom'];
			Object.assign(
				div.style,
				...field_info[i][j]
					.map((has_wall, ix) => !has_wall && { [`border-${borders[ix]}`]: '1px solid black' })
					.filter(Boolean)
			);
			container.appendChild(div);
		}
	}
	
};

draw(maze);

