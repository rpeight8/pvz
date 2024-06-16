import takeDamageFeature from '@/features/takeDamage';
import type { Damageable } from '@/features/takeDamage';
import { createBase } from '@/entities/base';
import type { Base, BaseProps } from '@/entities/base';

type PlantBase = Base & Damageable;

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
