import type { ProjectileBase } from '../ProjectileBase';
import createProjectileBase from '../ProjectileBase';

type PeaProjectile = ProjectileBase & {
  getDamage: () => number;
  setDamage: (damage: number) => void;
};

type PeaProjectileProps = {
  damage: number;
  x: number;
  y: number;
};

const createPeaProjectile = ({ damage, x, y }: PeaProjectileProps): PeaProjectile => {
  const baseProjectile = createProjectileBase({ damage, moveSpeed: 60, x, y, name: 'pea' });

  const peaProjectile: PeaProjectile = {
    ...baseProjectile,
    getDamage: () => damage,
    setDamage: (newDamage: number) => {
      damage = newDamage;
    },
  };
  return peaProjectile;
};

export default createPeaProjectile;
export type { PeaProjectile, PeaProjectileProps };
