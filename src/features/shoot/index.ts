import type { ProjectileBase } from '@/entities/projectiles/ProjectileBase';

type Base = {
  getX: () => number;
  getY: () => number;
};

type ProjectileBuilder<PR extends ProjectileBase> = ({ damage, x, y }: { damage: number; x: number; y: number }) => PR;

type Shootable<PR extends ProjectileBase> = Base & {
  shoot: () => PR;
  shootRate: number;
  shootDamage: number;
  projectileBuilder: ProjectileBuilder<PR>;
  getProjectile: () => ProjectileBuilder<PR>;
  setProjectile: (projectileBuilder: ProjectileBuilder<PR>) => void;
  getShootRate: () => number;
  setShootRate: (rate: number) => void;
};

type ShootableProps<T, PR extends ProjectileBase> = {
  projectileBuilder: ProjectileBuilder<PR>;
  shootRate: number;
  shootDamage: number;
  entity: T;
};

const shootFeature = <T extends Base, PR extends ProjectileBase>({
  projectileBuilder,
  shootRate,
  shootDamage,
  entity,
}: ShootableProps<T, PR>): Shootable<PR> => {
  const shootable: Shootable<PR> = {
    ...entity,
    projectileBuilder,
    shootRate,
    shootDamage,
    shoot: function () {
      return this.projectileBuilder({
        damage: this.shootDamage,
        x: this.getX(),
        y: this.getY(),
      });
    },
    getProjectile: function () {
      return this.projectileBuilder;
    },
    setProjectile: function (projectile: ProjectileBuilder<PR>) {
      this.projectileBuilder = projectile;
    },
    getShootRate: function () {
      return this.shootRate;
    },
    setShootRate: function (rate: number) {
      this.shootRate = rate;
    },
  };

  return shootable;
};

export default shootFeature;
export type { Shootable, ShootableProps };
