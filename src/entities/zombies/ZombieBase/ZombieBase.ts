import takeDamageFeature, { ITakeDamage } from '@/features/takeDamage';
import createBase from '@/entities/base/Base';
import type { IBase } from '@/entities/base/Base';
import moveFeature from '@/features/move';
import attackFeature from '@/features/attack';

interface IZombieBase extends IBase {
  name: string;
  health: number;
  damage: number;
  moveSpeed: number;
  attackSpeed: number;

  attack: (target: ITakeDamage) => void;
  move: (x: number, y: number) => void;
  takeDamage: (damage: number) => void;
}

interface ZombieBaseProps {
  name: string;
  health: number;
  damage: number;
  moveSpeed: number;
  attackSpeed: number;
  x: number;
  y: number;
}

const createZombieBase = ({ name, health, damage, moveSpeed, attackSpeed, x, y }: ZombieBaseProps): IZombieBase => {
  const base = createBase({ name, x, y });

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

export default createZombieBase;
export type { IZombieBase };
