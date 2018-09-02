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

const solution = (up, left, right, down, from) => {
	const from_index = ['left', 'up', 'right', 'down'].indexOf(from);

	const allowed = [up, right, down, left, up, right, down, left];
	return ['up', 'right', 'down', 'left', 'up', 'right', 'down', 'left']
		.find((dir, i) => i >= from_index && allowed[i]);
};

const bad_solutions = {
	freeze: () => { for(;;); },
	throw: () => null(),
	bad_direction_name: () => 'kek',
	iife_bad: `(() => {
		const xs = ['right', 'right', 'up', 'kek'];
		let i = 0;
		return () => xs[i++ % xs.length];
	})()`
};

