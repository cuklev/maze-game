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

	const _once = name => fn => emitter => {
		const one_time_action = (...args) => {
			fn(...args);
			emitter.removeEventListener(name, one_time_action);
		};

		emitter.addEventListener(name, one_time_action);
	};

	const init_step = code => {
		const worker = new Worker('js/worker.js');
		worker.postMessage({ name: 'init', code });

		return (...data) => new Promise((resolve, reject) => {
			_once(`message`)(({ data }) => resolve(data))(worker);
			worker.postMessage(data);
		});
	};

	return async (picasso, maze, solution) => {
		const {fill, draw, success, fail, clear} = picasso;
		clear();

		let row = maze.findIndex(r => r[0][directions.left]);
		let col = 0;
		let steps = 0;

		let came_from = directions.left;

		const step = init_step(String(solution));

		while(col < maze[0].length) {
			if(col < 0) {
				return fail({ message: 'Not the correct exit' });
			}

			fill(row, col);

			const {
				direction: direction_name,
				error
			} = await step(...maze[row][col], direction_names[came_from]);

			if (error) {
				return fail(error);
			}

			const dir = directions[direction_name];
			await sleep(play_step_timeout);
			if(dir === came_from) {
				fill(row, col);
				await sleep(play_step_timeout);
			}

			if(!direction_names.includes(direction_name)) {
				return fail({ message: `you returned '${direction_name}' :(` });
			}
			if(!maze[row][col][dir]) {
				return fail({ message: `you tried to walk through the wall :)` });
			}

			row += dr[dir];
			col += dc[dir];

			came_from = dir ^ 3;
			++steps;
		}

		success(steps);
		return true;
	};
})();
