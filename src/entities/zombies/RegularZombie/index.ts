import type { ZombieBase, ZombieBaseProps } from '@/entities/zombies/ZombieBase';
import createZombieBase from '@/entities/zombies/ZombieBase';
import moveFeature from '@/features/move';

type RegularZombie = ZombieBase & {
  moveSpeed: number;
  move: (moveSpeed: number) => void;
};

type RegularZombieProps = ZombieBaseProps & {
  moveSpeed: number;
};

const createRegularZombie = ({
  name,
  health,
  damage,
  moveSpeed,
  attackSpeed,
  x,
  y,
}: RegularZombieProps): RegularZombie => {
  const zombie = createZombieBase({ name, health, damage, attackSpeed, x, y });

  const regularZombie = {
    ...moveFeature<typeof zombie>({
      entity: zombie,
      moveSpeed,
    }),
  };

  return regularZombie;
};

export default createRegularZombie;
export type { RegularZombie, RegularZombieProps };
