type Base = {
  getX: () => number;
  getY: () => number;
  setX: (x: number) => void;
  setY: (y: number) => void;
};

type Moveable = Base & {
  moveSpeed: number;
  move: () => void;
  getSpeed: () => number;
  setSpeed: (speed: number) => void;
};

function moveFeature<T extends Base>({ entity, moveSpeed }: { entity: T; moveSpeed: number }): T & Moveable {
  return {
    ...entity,
    moveSpeed,
    move() {
      this.setX(this.getX() + this.moveSpeed);
      // this.y += moveSpeed;
    },
    getSpeed() {
      return this.moveSpeed;
    },
    setSpeed(speed: number) {
      this.moveSpeed = speed;
    },
  };
}

export default moveFeature;
export type { Moveable };
