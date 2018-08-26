onmessage = ({ data }) => {
	const { name, code } = data;

	if (name !== 'init') return;

	const step = eval(code);

	onmessage = ({ data }) => {
		try {
			postMessage({ direction: step(...data) });
		} catch(error) {
			postMessage({ error });
		}
	};
}

