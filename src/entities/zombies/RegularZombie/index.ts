import type { ZombieBase, ZombieBaseProps } from '@/entities/zombies/ZombieBase';
import createZombieBase from '@/entities/zombies/ZombieBase';
import attackFeature from '@/features/attack';
import moveFeature from '@/features/move';
import { Damageable } from '@/features/takeDamage';

type RegularZombie = ZombieBase & {
  move: () => void;
  getMoveSpeed: () => number;
  attack: (target: Damageable) => void;
  getDamage: () => number;
  getAttackSpeed: () => number;
  getNextTickX: () => number;
};

type RegularZombieProps = ZombieBaseProps & {
  moveSpeed: number;
  damage: number;
  attackSpeed: number;
};

const createRegularZombie = ({
  moveSpeed,
  x,
  y,
  name,
  health,
  attackSpeed,
  damage,
}: RegularZombieProps): RegularZombie => {
  const baseZombie = createZombieBase({ name, health, x, y });

  const regularZombie: RegularZombie = {
    ...baseZombie,
    ...moveFeature({
      moveSpeed,
      getX: baseZombie.getX,
      setX: baseZombie.setX,
    }),

    ...attackFeature({
      damage,
      attackSpeed,
    }),
  };
  return regularZombie;
};

export default createRegularZombie;
export type { RegularZombie, RegularZombieProps };
