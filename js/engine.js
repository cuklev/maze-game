const play_step_timeout = 50;
const direction_names = ['up', 'left', 'right', 'down'];
const directions = {
	up: 0,
	left: 1,
	right: 2,
	down: 3
};

const dr = [-1, 0, 0, 1];
const dc = [0, -1, 1, 0];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const init_mazes = (mazes = 4, root = document.getElementById('maze')) => Array.from({ length: mazes }).map(i => {
	const maze_container = document.createElement('div');
	maze_container.className = 'maze-container';
	root.appendChild(maze_container);

	return maze_container;
});

const play = container => async (maze, solution) => {
	let row = maze.findIndex(r => r[0][directions.left]);
	let col = 0;

	let came_from = directions.left;

	const { fill, draw } = init_picasso(container, maze);
	draw(maze);

	const step = init_step(String(solution));

	while(col < maze[0].length) {
		if(col < 0) {
			alert('Not the correct exit');
			return false;
		}

		fill(row, col);

		const {
			direction: direction_name,
			error
		} = await step(...maze[row][col], direction_names[came_from]);

		if (error) {
			console.log(error);
			alert(error.stack);
			return false;
		}

		const dir = directions[direction_name];
		await sleep(play_step_timeout);
		if(dir === came_from) {
			fill(row, col);
			await sleep(play_step_timeout);
		}

		if(!direction_names.includes(direction_name)) {
			alert('Invalid return');
			return false;
		}
		if(!maze[row][col][dir]) {
			alert('The wall');
			return false;
		}

		row += dr[dir];
		col += dc[dir];

		came_from = dir ^ 3;
	}

	return true;
};
