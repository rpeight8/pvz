import takeDamageFeature, { ITakeDamage } from '@/features/takeDamage';
import createBase from '@/entities/base/Base';
import type { IBase } from '@/entities/base/Base';
import attackFeature from '@/features/attack';

interface IPlantBase extends IBase {
  name: string;
  health: number;
  damage: number;
  attackSpeed: number;

  attack: (target: ITakeDamage) => void;
  takeDamage: (damage: number) => void;
}

interface PlantBaseProps {
  name: string;
  health: number;
  damage: number;
  attackSpeed: number;
  x: number;
  y: number;
}

const createPlantBase = ({ name, health, damage, attackSpeed, x, y }: PlantBaseProps): IPlantBase => {
  const base = createBase({ name, x, y });

  const plant = {
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

  return plant;
};

export default createPlantBase;
export type { IPlantBase };
