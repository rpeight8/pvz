import type { ProjectileBase } from '../ProjectileBase';
import createProjectileBase from '../ProjectileBase';

type PeaProjectile = ProjectileBase & {
  // no additional properties
};

type PeaProjectileProps = {
  damage: number;
  x: number;
  y: number;
};

const createPeaProjectile = ({ damage, x, y }: PeaProjectileProps): PeaProjectile => {
  const projectile = createProjectileBase({ damage, moveSpeed: 60, x, y, name: 'pea' });

  return projectile;
};

export default createPeaProjectile;
export type { PeaProjectile, PeaProjectileProps };
