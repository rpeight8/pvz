interface IMove {
  x: number;
  y: number;
  moveSpeed: number;
  move: (x: number, y: number) => void;
}

function moveFeature<T extends { x: number; y: number }>({
  entity,
  moveSpeed,
}: {
  entity: T;
  moveSpeed: number;
}): T & IMove {
  return {
    ...entity,
    moveSpeed,
    move(x: number, y: number) {
      this.x = x;
      this.y = y;
    },
  };
}

export default moveFeature;
