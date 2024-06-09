import takeDamageFeature from '@/features/takeDamage';
import { createBase } from '@/entities/base/Base';
import type { Base, BaseProps } from '@/entities/base/Base';

type PlantBase = Base & {
  takeDamage: (damage: number) => void;
  getHealth: () => number;
  setHealth: (health: number) => void;
};

type PlantBaseProps = BaseProps & {
  health: number;
};

const createPlantBase = ({ name, health, x, y }: PlantBaseProps): PlantBase => {
  const plant = {
    ...createBase({ name, x, y }),
    ...takeDamageFeature({
      health,
    }),
  };

  return plant;
};

export default createPlantBase;
export type { PlantBase, PlantBaseProps, Base };
