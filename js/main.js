const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode("ace/mode/javascript");
const get_solution = () => `
        (() => {
                ${editor.getValue()}
                return step;
        })();
`;

const start = () => init_mazes().map((c, i) => play(c)(mazes[i], get_solution()));

document.getElementById('start-btn').addEventListener('click', start);
