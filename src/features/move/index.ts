enum Direction {
  LEFT = 'LEFT',
  LEFT_TOP = 'LEFT_TOP',
  TOP = 'TOP',
  TOP_RIGHT = 'TOP_RIGHT',
  RIGHT = 'RIGHT',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
  BOTTOM = 'BOTTOM',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
}

type Coordinates = {
  x: number;
  y: number;
};

const directionOffsets: { [key in Direction]: Coordinates } = {
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.LEFT_TOP]: { x: -1, y: -1 },
  [Direction.TOP]: { x: 0, y: -1 },
  [Direction.TOP_RIGHT]: { x: 1, y: -1 },
  [Direction.RIGHT]: { x: 1, y: 0 },
  [Direction.RIGHT_BOTTOM]: { x: 1, y: 1 },
  [Direction.BOTTOM]: { x: 0, y: 1 },
  [Direction.BOTTOM_LEFT]: { x: -1, y: 1 },
};

type Moveable = {
  move: () => void;
  getMoveSpeed: () => number;
  setMoveSpeed: (speed: number) => void;
  getDirection: () => Direction;
  setDirection: (direction: Direction) => void;
  getNextTickPosition: () => [number, number];
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
};

type MoveableProps = {
  moveSpeed: number;
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
  initialDirection?: Direction;
};

function moveFeature({
  moveSpeed,
  getX,
  setX,
  getY,
  setY,
  initialDirection = Direction.RIGHT,
}: MoveableProps): Moveable {
  let currentDirection = initialDirection;
  const moveable: Moveable = {
    move() {
      const [nextX, nextY] = this.getNextTickPosition();
      this.setX(nextX);
      this.setY(nextY);
    },
    getMoveSpeed() {
      return moveSpeed;
    },
    setMoveSpeed(speed: number) {
      moveSpeed = speed;
    },
    getDirection() {
      return currentDirection;
    },
    setDirection(direction: Direction) {
      currentDirection = direction;
    },
    getX,
    setX,
    getY,
    setY,
    getNextTickPosition() {
      const offset = directionOffsets[currentDirection];
      return [this.getX() + offset.x * moveSpeed, this.getY() + offset.y * moveSpeed];
    },
  };

  return moveable;
}

function isMoveable(entity: any): entity is Moveable {
  return 'move' in entity;
}

export default moveFeature;
export type { Moveable };
export { Direction, isMoveable };
