const init_picasso = (() => {
	const _unit = unit => value => `${value}${unit}`;
	const [_px, _pct] = [`px`, `%`].map(_unit);

	const _draw = container => maze => {
		const borders = [`top`, `left`, `right`, `bottom`]
		const cell_size = parseInt(container.clientWidth) / maze[0].length;
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
				div.style.backgroundColor = `rgba(102, 217, 239, 0)`;
				row.appendChild(div);
			}
			container.appendChild(row);
		}
	};

	const _fill = container => columns => (r, c) => {
		const element = container.children[r].children[c];
		const rgba = Array.of;
		const xs = eval(element.style.backgroundColor);
		xs.push(Math.min(1, xs.pop() - -0.2));
		element.style.backgroundColor = `rgba(${xs.join(', ')})`;
	};

	const _success = container => steps => {
		const success = Object.assign(
			document.createElement('div'),
			{
				className: `notification`,
				innerHTML: `
					<img src="assets/success.png" />
					<p>you escaped in ${steps} steps</p>
				`
			}
		);

		container.appendChild(success);
	};

	const _fail = container => error => {
		const fail = Object.assign(
			document.createElement('div'),
			{
				className: `notification`,
				innerHTML: `
					<img src="assets/fail.png" />
					<p>${error.message}</p>
				`
			}
		);

		container.appendChild(fail);
	};

	return (container, maze) => ({
		fill: _fill(container)(maze[0].length),
		draw: _draw(container),
		success: _success(container),
		fail: _fail(container)
	});
})();
