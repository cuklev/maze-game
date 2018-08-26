const handle_message = step => ({ data }) => {
	const { name, code } = data;

	if (name === 'init') {
		step = eval(code);
		return;
	}

	try {
		self.postMessage({ direction: step(...data) });
	} catch({ message, stack, name }) {
		self.postMessage({ error: { message, stack, name } });
	}
}

self.onmessage = handle_message()
