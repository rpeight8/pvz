type Moveable = {
  move: () => void;
  getMoveSpeed: () => number;
  setMoveSpeed: (speed: number) => void;
  getNextTickX: () => number;
  getX: () => number;
  setX: (x: number) => void;
};

type MoveableProps = {
  moveSpeed: number;
  getX: () => number;
  setX: (x: number) => void;
};

function moveFeature({ moveSpeed, getX, setX }: MoveableProps): Moveable {
  const moveable: Moveable = {
    move() {
      this.setX(this.getNextTickX());
    },
    getMoveSpeed() {
      return moveSpeed;
    },
    setMoveSpeed(speed: number) {
      moveSpeed = speed;
    },
    getX,
    setX,
    getNextTickX() {
      return this.getX() + moveSpeed;
    },
  };

  return moveable;
}

export default moveFeature;
export type { Moveable };
