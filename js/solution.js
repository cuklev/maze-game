// const step = (up, left, right, down, from) => {
//   if(down) return 'down';
//   if(right) return 'right';
//   if(up) return 'up';
//   if(left && from !== 'left') return 'left';
// };

const step = (up, left, right, down, from) => {
  const from_index = ['left', 'up', 'right', 'down'].indexOf(from);

  const allowed = [up, right, down, left, up, right, down, left];
  return ['up', 'right', 'down', 'left', 'up', 'right', 'down', 'left']
      .find((dir, i) => i >= from_index && allowed[i]);
};
