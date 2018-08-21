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

draw(maze);

