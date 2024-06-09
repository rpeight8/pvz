import type { PlantBase, PlantBaseProps } from '@/entities/plants/PlantBase';
import createPlantBase from '@/entities/plants/PlantBase';
import createPeaProjectilefrom from '@/entities/projectiles/PeaProjectile';
import type { PeaProjectile } from '@/entities/projectiles/PeaProjectile';
import type { ProjectileBase } from '@/entities/projectiles/ProjectileBase';
import shootFeature from '@/features/shoot';

type ProjectileBuilder<PR extends ProjectileBase> = ({ damage, x, y }: { damage: number; x: number; y: number }) => PR;

type PeashooterPlant<PR extends ProjectileBase> = PlantBase & {
  shoot: () => ProjectileBuilder<PR>;
  getShootRate: () => number;
  setShootRate: (rate: number) => void;
  getShootDamage: () => number;
  setShootDamage: (damage: number) => void;
  projectile: ProjectileBuilder<PR>;
  getProjectile: () => ProjectileBuilder<PR>;
  setProjectile: (projectile: ProjectileBuilder<PR>) => void;
};

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
      projectileBuilder: createPeaProjectilefrom,
    }),
  };

  return peashooterPlant;
};

export default createPeashooterPlant;
export type { PeashooterPlant, PeashooterPlantProps };
