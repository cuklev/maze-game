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

const play = async maze => {
	let row = maze.findIndex(r => r[0][directions.left]);
	let col = 0;

	let came_from = directions.left;

	const { fill, draw } = init_picasso(maze);
	draw(maze);

	while(col < maze[0].length) {
		if(col < 0) {
			alert('Not the correct exit');
			return false;
		}

		fill(row, col);

		const direction_name = step(...maze[row][col], direction_names[came_from]);
		const dir = directions[direction_name];
		await sleep(50);

		if(typeof dir === 'undefined') {
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

play(maze);
