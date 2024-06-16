import attackFeature from '@/features/attack';
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
  const baseProjectile = createProjectileBase({ damage, moveSpeed: 2000, x, y, name: 'pea' });

  const peaProjectile: PeaProjectile = {
    ...baseProjectile,
    ...attackFeature({ damage, attackSpeed: 0 }),
  };
  return peaProjectile;
};

export default createPeaProjectile;
export type { PeaProjectile, PeaProjectileProps };
