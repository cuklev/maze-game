(() => {
	const editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.session.setMode("ace/mode/javascript");
	const get_solution = () => `
		(() => {
			${editor.getValue()}
			return step;
		})();
	`;

	const picassos = ((root) => mazes.map(maze => {
		const maze_container = document.createElement('div');
		maze_container.className = 'maze-container';
		root.appendChild(maze_container);

		const picasso = init_picasso(maze_container, maze);
		picasso.draw();
		return picasso;
	}))(document.getElementById('maze'));

	const start = () => picassos.map((picasso, i) => play(picasso, mazes[i], get_solution()));

	document.getElementById('start-btn').addEventListener('click', start);
})();
