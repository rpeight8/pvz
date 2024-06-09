type Moveable = {
  move: () => void;
  getMoveSpeed: () => number;
  setMoveSpeed: (speed: number) => void;
  getNextTickX: () => number;
  getMoveX: () => number;
  setMoveX: (x: number) => void;
};

type MoveableProps = {
  moveSpeed: number;
  getX: () => number;
  setX: (x: number) => void;
};

function moveFeature({ moveSpeed, getX, setX }: MoveableProps): Moveable {
  const moveable: Moveable = {
    move() {
      this.setMoveX(this.getNextTickX());
    },
    getMoveSpeed() {
      return moveSpeed;
    },
    setMoveSpeed(speed: number) {
      moveSpeed = speed;
    },
    getMoveX() {
      return getX();
    },
    setMoveX(x: number) {
      setX(x);
    },
    getNextTickX() {
      return this.getMoveX() + moveSpeed;
    },
  };

  return moveable;
}

export default moveFeature;
export type { Moveable };
