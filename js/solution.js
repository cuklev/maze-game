const _once = (fn, name, emitter) => {
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
		_once(
			({ data: { direction, error } }) => error ? reject(error) : resolve(direction ),
			'message',
			worker
		);

		worker.postMessage(data);
	});
};

const getStep = (up, left, right, down, from) => {
  const from_index = ['left', 'up', 'right', 'down'].indexOf(from);

  const allowed = [up, right, down, left, up, right, down, left];
  return ['up', 'right', 'down', 'left', 'up', 'right', 'down', 'left']
      .find((dir, i) => i >= from_index && allowed[i]);
};
