const play = (() => {
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

	return async (fill, maze, runner) => {
		let row = maze.findIndex(r => r[0][directions.left]);
		let col = 0;
		let steps = 0;

		let came_from = directions.left;

		while(col < maze[0].length) {
			if (await runner.is_terminated()) {
				return {terminated: true};
			}

			if(col < 0) {
				return {error: 'Not the correct exit'};
			}

			fill(row, col);

			const {
				direction: direction_name,
				error
			} = await runner.step(...maze[row][col], direction_names[came_from]);

			if (error) {
				return {error};
			}

			const dir = directions[direction_name];
			await sleep(play_step_timeout);
			if(dir === came_from) {
				fill(row, col);
				await sleep(play_step_timeout);
			}

			if(!direction_names.includes(direction_name)) {
				return {error: `you returned '${direction_name}' :(`};
			}
			if(!maze[row][col][dir]) {
				return {error: `you tried to walk through the wall :)`};
			}

			row += dr[dir];
			col += dc[dir];

			came_from = dir ^ 3;
			++steps;
		}

		return {steps};
	};
})();
