(() => {
	const editor = ace.edit(`editor`);
	editor.setTheme(`ace/theme/monokai`);
	editor.session.setMode("ace/mode/javascript");
	editor.setValue(`// Your task, should you choose to accept it, is to create an
// artificial agent that will be able to escape the mazes
// on the right without.
// Your agent will start at the entrance on the left side
// of the maze and it much the exit located on the right.
// In order to this, you must complete the function bellow
// which determines the agents next actions.
// The function is given 5 arguments:
//  * 4 boolean values (up, left, right, down) - these tell your
//      agent whether it can move in the given direction.
//      If true, then the given move is valid.
//  * 1 string value (from) - this is a string telling your agent
//      the direction from which it came from.
//      It can be 'up', 'left', 'right' or 'down'.
// The function must return a string determining the agents next move.
// Valid values are the same as for the from parameter.
// If the function returns an invalid value for the current step
// (invalid string name or the given direction has a wall) your
// agent will fail the task.
const step = (up, left, right, down, from) => {
  return ['up', 'left', 'right', 'down'][0];
};`);

	const get_solution = () => `
		(() => {
			${editor.getValue()}
			return step;
		})();
	`;

	const picassos = ((root) => mazes.map(maze => {
		const maze_container = document.createElement(`div`);
		maze_container.className = `maze-container`;
		root.appendChild(maze_container);

		const picasso = init_picasso(maze_container, maze);
		picasso.draw();
		return picasso;
	}))(document.getElementById(`maze`));

	const _once = (name, fn, emitter) => {
		const one_time_action = (...args) => {
			fn(...args);
			emitter.removeEventListener(name, one_time_action);
		};

		emitter.addEventListener(name, one_time_action);
	};

	// chrome won`t load the worker script via file:// protocol -_-
	const _haxx_for_chrome = URL.createObjectURL(
		new Blob(
			[`(${String(init_worker)})()`],
			{type: `text/javascript`}
		)
	);

	const init_step_runner = async code => {
		const worker = new Worker(_haxx_for_chrome);
		worker.postMessage({name: `init`, code});

		const step = (...data) => new Promise((resolve, reject) => {
			_once(`message`, message => resolve(message.data), worker);
			worker.postMessage(data);
		});

		let terminate;
		const termination = new Promise(resolve => terminate = () => resolve(true));
		const is_terminated = () => Promise.race([termination, false]);

		return { step, terminate, is_terminated };
	};

	const start = (runners = []) => () => picassos.map(async (picasso, i) => {
		const {clear, draw, fill, success, fail} = picasso;
		clear(); draw();

		const runner = await init_step_runner(get_solution());
		if (runners[i]) {
			runners[i].terminate();
		}

		runners[i] = runner;
		const {error, steps, terminated} = await play(
			fill,
			mazes[i],
			runner
		);

		if (terminated) {
			return;
		}

		if (error) {
			return fail({message: error});
		}

		return success(steps)
	});

	document.getElementById(`start-btn`).addEventListener(`click`, start());
})();
