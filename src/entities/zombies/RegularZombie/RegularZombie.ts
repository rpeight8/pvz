import type { IZombie } from '@/entities/zombies/Zombie/Zombie';
import createZombie from '@/entities/zombies/Zombie/Zombie';

interface IRegularZombie extends IZombie {
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
  const zombie = createZombie({ name, health, damage, moveSpeed, attackSpeed });

  return zombie;
};

export default createRegularZombie;
