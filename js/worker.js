const handle_message = step => ({ data }) => {
	const { name, code } = data;

	if (name === 'init') {
		step = eval(code);
		return;
	}

	try {
		postMessage({ direction: step(...data) });
	} catch({ message, stack, name }) {
		postMessage({ error: { message, stack, name } });
	}
}

onmessage = handle_message()

