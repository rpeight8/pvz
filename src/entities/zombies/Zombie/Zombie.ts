import takeDamageFeature, { ITakeDamage } from '@/features/takeDamage';
import createBase from '@/entities/base/Base';
import type { IBase } from '@/entities/base/Base';
import moveFeature from '@/features/move';
import attackFeature from '@/features/attack';

interface IZombie extends IBase {
  name: string;
  health: number;
  damage: number;
  moveSpeed: number;
  attackSpeed: number;

  attack: (target: ITakeDamage) => void;
  move: (x: number, y: number) => void;
  takeDamage: (damage: number) => void;
}

interface ZombieProps {
  name: string;
  health: number;
  damage: number;
  moveSpeed: number;
  attackSpeed: number;
}

const createZombie = ({ name, health, damage, moveSpeed, attackSpeed }: ZombieProps): IZombie => {
  const base = createBase({ name, screenX: 0, screenY: 0, gameX: 0, gameY: 0 });

  const zombie = {
    ...moveFeature<IBase>({
      entity: base,
      moveSpeed,
    }),
    ...takeDamageFeature<IBase>({
      health,
      entity: base,
    }),
    ...attackFeature<IBase>({
      damage,
      attackSpeed,
      entity: base,
    }),
  };

  return zombie;
};

export default createZombie;
export type { IZombie };
