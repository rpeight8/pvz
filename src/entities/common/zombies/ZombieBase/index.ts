import takeDamageFeature from '@/features/takeDamage';
import type { Damageable } from '@/features/takeDamage';
import { createBase } from '@/entities/common/base';
import type { Base, BaseProps } from '@/entities/common/base';

type ZombieBase = Base & Damageable;

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
