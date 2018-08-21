const step = (up, left, right, down, from) => {
  if(up) return 'up';
  if(left && from !== 'left') return 'left';
  if(right) return 'right';
  if(down) return 'down';
};
