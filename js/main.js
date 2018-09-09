(() => {
	const init_mazes = (root = document.getElementById('maze')) => mazes.map(maze => {
		const maze_container = document.createElement('div');
		maze_container.className = 'maze-container';
		root.appendChild(maze_container);

		const picasso = init_picasso(maze_container, maze);
		picasso.draw(maze);
		return picasso;
	});

	const editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.session.setMode("ace/mode/javascript");
	const get_solution = () => `
		(() => {
			${editor.getValue()}
			return step;
		})();
	`;

	const picassos = init_mazes();
	const start = () => picassos.map((picasso, i) => play(picasso, mazes[i], get_solution()));

	document.getElementById('start-btn').addEventListener('click', start);
})();
