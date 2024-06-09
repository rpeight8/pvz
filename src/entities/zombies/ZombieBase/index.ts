import takeDamageFeature from '@/features/takeDamage';
import { createBase } from '@/entities/base/Base';
import type { BaseProps } from '@/entities/base/Base';

type Base = {
  getId: () => string;
  getName: () => string;
  getX: () => number;
  getY: () => number;
  setX: (x: number) => void;
  setY: (y: number) => void;
};

type ZombieBase = Base & {
  takeDamage: (damage: number) => void;
};

type ZombieBaseProps = BaseProps & {
  health: number;
  name: string;
  x: number;
  y: number;
};

const createZombieBase = ({ name, health, x, y }: ZombieBaseProps): ZombieBase => {
  const zombie = {
    ...createBase({ name, x, y }),
    ...takeDamageFeature({
      health,
    }),
  };

  return zombie;
};

export default createZombieBase;
export type { ZombieBase, ZombieBaseProps };
