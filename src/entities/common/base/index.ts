import generateId from '@utils/idGenerator';
import renderer from '@/renderer';

type Base = {
  id: string;
  name: string;
  x: number;
  y: number;
  getX: () => number;
  getY: () => number;
  setY: (y: number) => void;
  setX: (x: number) => void;
  getId: () => string;
  getName: () => string;
};

type BaseProps = {
  name: string;
  x: number;
  y: number;
};

const createBase = ({ name, x, y }: BaseProps): Base => {
  const base = {
    id: generateId(),
    name,
    x,
    y,
    renderer: renderer,
    getX: function () {
      return this.x;
    },
    getY: function () {
      return this.y;
    },
    setY: function (y: number) {
      this.y = y;
    },
    setX: function (x: number) {
      this.x = x;
    },
    getId: function () {
      return this.id;
    },
    getName: function () {
      return this.name;
    },
  };

  return base;
};

export { createBase };
export type { Base, BaseProps };
