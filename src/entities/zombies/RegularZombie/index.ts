import type { ZombieBase, ZombieBaseProps } from '@/entities/zombies/ZombieBase';
import createZombieBase from '@/entities/zombies/ZombieBase';
import attackFeature from '@/features/attack';
import moveFeature, { Direction } from '@/features/move';
import type { Moveable } from '@/features/move';
import { Damageable } from '@/features/takeDamage';

type RegularZombie = ZombieBase & Moveable & Damageable;

type RegularZombieProps = ZombieBaseProps & {
  moveSpeed?: number;
  damage: number;
  attackSpeed: number;
};

const createRegularZombie = ({
  moveSpeed = 100,
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
      initialDirection: Direction.LEFT,
      moveSpeed,
      getX: baseZombie.getX,
      setX: baseZombie.setX,
      getY: baseZombie.getY,
      setY: baseZombie.setY,
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
