const dr = [-1, 0, 0, 1];
const dc = [0, -1, 1, 0];

const generate = (width, height) => {
	const entry_row = Math.random() * height | 0;
	const exit_row = Math.random() * height | 0;

	const mazeOutput = Array.from({length: height})
		.map(r => Array.from({length: width}).map(c => [false, false, false, false]));

	mazeOutput[entry_row][0][1] = true;
	mazeOutput[exit_row][width - 1][2] = true;

	const visited = Array.from({length: height}).map(() => []);

	const isValidCell = (r, c) => r >= 0 && r < height && c >= 0 && c < width;

	const dfs = (r, c) => {
		visited[r][c] = true;

		[0, 1, 2, 3]
			.sort(() => Math.random() - 0.5)
			.filter(i => isValidCell(r + dr[i], c + dc[i]))
			.forEach(i => {
				if(!visited[r + dr[i]][c + dc[i]]) {
					mazeOutput[r][c][i] = true;
					mazeOutput[r + dr[i]][c + dc[i]][i ^ 3] = true;
					dfs(r + dr[i], c + dc[i]);
				}
			});
	};

	dfs(0, 0);

	return mazeOutput;
};

const showArray = (x) => {
	if(!Array.isArray(x)) return x + '';
	return '[' + x.map(y => showArray(y)).join(',') + ']';
};

const mazes = [0, 1, 2, 3].map(_ => generate(42, 25));
const output = `
// the maze is 2d array of cell descriptions
// each cell is an array of 4 bools: [up, left, right, down]

const mazes = ${showArray(mazes)};`;

require('fs').writeFileSync('js/mazes.js', output);
