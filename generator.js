const MAZE_WIDTH = 10;
const MAZE_HEIGHT = 10;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const entry_row = Math.random() * MAZE_HEIGHT | 0;
const exit_row = Math.random() * MAZE_HEIGHT | 0;

const visited = Array.from({length: MAZE_HEIGHT}).map(() => []);

const mazeOutput = Array.from({length: MAZE_HEIGHT})
	.map(r => Array.from({length: MAZE_WIDTH}).map(c => [false, false, false, false]));

const isValidCell = (r, c) => r >= 0 && r < MAZE_HEIGHT && c >= 0 && c < MAZE_WIDTH;

const dfs = (r, c) => {
	visited[r][c] = true;

	[0, 1, 2, 3]
		.sort(() => Math.random() - 0.5)
		.filter(i => isValidCell(r + dx[i], c + dy[i]))
		.forEach(i => {
			if(!visited[r + dx[i]][c + dy[i]]) {
				mazeOutput[r][c][i] = true;
				mazeOutput[r + dx[i]][c + dy[i]][i ^ 3] = true;
				dfs(r + dx[i], c + dy[i]);
			}
		});
};

dfs(0, 0);

console.log(mazeOutput);
