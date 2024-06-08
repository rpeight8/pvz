import type { IZombieBase } from '@/entities/zombies/ZombieBase/ZombieBase';
import createZombieBase from '@/entities/zombies/ZombieBase/ZombieBase';

interface IRegularZombie extends IZombieBase {
  // no additional properties
}

interface IRegularZombieProps {
  name: string;
  health: number;
  damage: number;
  moveSpeed: number;
  attackSpeed: number;
}

const createRegularZombie = ({ name, health, damage, moveSpeed, attackSpeed }: IRegularZombieProps): IRegularZombie => {
  const zombie = createZombieBase({ name, health, damage, moveSpeed, attackSpeed });

  return zombie;
};

export default createRegularZombie;
