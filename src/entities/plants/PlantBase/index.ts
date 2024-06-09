import takeDamageFeature from '@/features/takeDamage';
import type { Damageable } from '@/features/takeDamage';
import { createBase } from '@/entities/base/Base';
import type { BaseProps } from '@/entities/base/Base';
import attackFeature from '@/features/attack';

type Base = {
  getId: () => string;
  getName: () => string;
};

type PlantBase = Base & {
  health: number;
  damage: number;
  attackSpeed: number;

  attack: (target: Damageable) => void;
  takeDamage: (damage: number) => void;
};

type PlantBaseProps = BaseProps & {
  health: number;
  damage: number;
  attackSpeed: number;
};

const createPlantBase = ({ name, health, damage, attackSpeed, x, y }: PlantBaseProps): PlantBase => {
  const base = createBase({ name, x, y });

  const plant = {
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

  return plant;
};

export default createPlantBase;
export type { PlantBase, PlantBaseProps };
