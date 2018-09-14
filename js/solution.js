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
	life_bad: `(() => {
		const xs = ['right', 'right', 'up', 'kek'];
		let i = 0;
		return () => xs[i++ % xs.length];
	})()`
};

