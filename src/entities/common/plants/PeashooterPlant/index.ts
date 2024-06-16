import type { PlantBase, PlantBaseProps } from '@/entities/common/plants/PlantBase';
import createPlantBase from '@/entities/common/plants/PlantBase';
import createPeaProjectile from '@/entities/common/projectiles/PeaProjectile';
import type { PeaProjectile } from '@/entities/common/projectiles/PeaProjectile';
import shootFeature, { Shootable } from '@/features/shoot';

type PeashooterPlant = PlantBase & Shootable<PeaProjectile>;

type PeashooterPlantProps = PlantBaseProps & {
  shootDamage: number;
  shootRate?: number;
};

const createPeashooterPlant = ({ name, health, shootDamage, shootRate = 240, x, y }: PeashooterPlantProps) => {
  const plant = createPlantBase({ name, health, x, y });

  const peashooterPlant = {
    ...plant,
    ...shootFeature<PeaProjectile>({
      shootRate,
      shootDamage,
      getShootX: plant.getX,
      getShootY: plant.getY,
      projectileBuilder: createPeaProjectile,
    }),
  };

  return peashooterPlant;
};

export default createPeashooterPlant;
export type { PeashooterPlant, PeashooterPlantProps };
