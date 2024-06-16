import type { PlantBase, PlantBaseProps } from '@/entities/plants/PlantBase';
import createPlantBase from '@/entities/plants/PlantBase';
import createPeaProjectile from '@/entities/projectiles/PeaProjectile';
import type { PeaProjectile } from '@/entities/projectiles/PeaProjectile';
import type { ProjectileBase } from '@/entities/projectiles/ProjectileBase';
import shootFeature, { Shootable } from '@/features/shoot';

type PeashooterPlant<PR extends ProjectileBase> = PlantBase & Shootable<PR>;

type PeashooterPlantProps = PlantBaseProps & {
  shootDamage: number;
  shootRate: number;
};

const createPeashooterPlant = ({ name, health, shootDamage, shootRate, x, y }: PeashooterPlantProps) => {
  const plant = createPlantBase({ name, health, x, y });

  const peashooterPlant = {
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
