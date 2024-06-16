import { createBase } from '@/entities/base';
import type { Base, BaseProps } from '@/entities/base';
import moveFeature, { Moveable } from '@/features/move';

type ProjectileBase = Base & Moveable;

type ProjectileBaseProps = BaseProps & {
  damage: number;
  moveSpeed: number;
};

const createProjectileBase = ({ moveSpeed, x, y, name }: ProjectileBaseProps): ProjectileBase => {
  const base = createBase({ name, x, y });
  const projectile = {
    ...base,
    ...moveFeature({
      getX: base.getX,
      setX: base.setX,
      getY: base.getY,
      setY: base.setY,
      moveSpeed,
    }),
  };

  return projectile;
};

export default createProjectileBase;
export type { ProjectileBase, ProjectileBaseProps };
