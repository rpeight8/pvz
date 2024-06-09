import takeDamageFeature from '@/features/takeDamage';
import type { Damageable } from '@/features/takeDamage';
import { createBase } from '@/entities/base/Base';
import type { BaseProps } from '@/entities/base/Base';
import attackFeature from '@/features/attack';

type Base = {
  getId: () => string;
  getName: () => string;
  getX: () => number;
  getY: () => number;
  setX: (x: number) => void;
  setY: (y: number) => void;
};

type ZombieBase = Base & {
  health: number;
  damage: number;
  attackSpeed: number;

  attack: (target: Damageable) => void;
  takeDamage: (damage: number) => void;
};

type ZombieBaseProps = BaseProps & {
  health: number;
  damage: number;
  attackSpeed: number;
};

const createZombieBase = ({ name, health, damage, attackSpeed, x, y }: ZombieBaseProps): ZombieBase => {
  const base = createBase({ name, x, y });

  const zombie = {
    ...takeDamageFeature<Base>({
      health,
      entity: base,
    }),
    ...attackFeature<Base>({
      damage,
      attackSpeed,
      entity: base,
    }),
  };

  return zombie;
};

export default createZombieBase;
export type { ZombieBase, ZombieBaseProps };
