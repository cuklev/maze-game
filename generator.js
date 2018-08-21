const MAZE_WIDTH = 10;
const MAZE_HEIGHT = 10;

const dr = [-1, 0, 0, 1];
const dc = [0, -1, 1, 0];

const entry_row = Math.random() * MAZE_HEIGHT | 0;
const exit_row = Math.random() * MAZE_HEIGHT | 0;

const mazeOutput = Array.from({length: MAZE_HEIGHT})
	.map(r => Array.from({length: MAZE_WIDTH}).map(c => [false, false, false, false]));

mazeOutput[entry_row][0][1] = true;
mazeOutput[exit_row][MAZE_WIDTH - 1][2] = true;

const visited = Array.from({length: MAZE_HEIGHT}).map(() => []);

const isValidCell = (r, c) => r >= 0 && r < MAZE_HEIGHT && c >= 0 && c < MAZE_WIDTH;

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

console.log(mazeOutput);
