(() => {
	const editor = ace.edit(`editor`);
	editor.setTheme(`ace/theme/monokai`);
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
			fail({message: error});
		}

		success(steps)
	});

	document.getElementById(`start-btn`).addEventListener(`click`, start());
})();
