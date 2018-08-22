// const step = (up, left, right, down, from) => {
//   if(down) return 'down';
//   if(right) return 'right';
//   if(up) return 'up';
//   if(left && from !== 'left') return 'left';
// };

const step = (up, left, right, down, from) => {
  const from_index = {
    up: 0,
    left: 1,
    right: 2,
    down: 3
  }[from];

  const allowed = [right, up, down, left, right, up, down, left];
  return ['right', 'up', 'down', 'left', 'right', 'up', 'down', 'left']
      .find((dir, i) => i >= from_index && allowed[i]);
};
