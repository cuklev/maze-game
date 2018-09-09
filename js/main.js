(() => {
	const editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.session.setMode("ace/mode/javascript");
	editor.setValue(`const step = (up, left, right, down, from) => {
  const from_index = ['left', 'up', 'right', 'down'].indexOf(from);

  const allowed = [up, right, down, left, up, right, down, left];
  return ['up', 'right', 'down', 'left', 'up', 'right', 'down', 'left']
      .find((dir, i) => i >= from_index && allowed[i]);
};`);

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

	const start = () => picassos.map(async (picasso, i) => {
		const { clear, draw, fill, success, fail } = picasso;
		clear(); draw();
		const result = await play(fill, mazes[i], get_solution());
		if(result.error) {
			fail({message: result.error});
		} else {
			success(result.steps);
		}
	});

	document.getElementById('start-btn').addEventListener('click', start);
})();
