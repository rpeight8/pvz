import type { ProjectileBase } from '@/entities/projectiles/ProjectileBase';

type ProjectileBuilder<PR extends ProjectileBase> = ({ damage, x, y }: { damage: number; x: number; y: number }) => PR;

type Shootable<PR extends ProjectileBase> = {
  shoot: () => PR;
  projectileBuilder: ProjectileBuilder<PR>;
  getProjectile: () => ProjectileBuilder<PR>;
  setProjectile: (projectileBuilder: ProjectileBuilder<PR>) => void;
  getShootRate: () => number;
  setShootRate: (rate: number) => void;
  getShootX: () => number;
  getShootY: () => number;
};

type ShootableProps<PR extends ProjectileBase> = {
  projectileBuilder: ProjectileBuilder<PR>;
  shootRate: number;
  shootDamage: number;
  getShootX: () => number;
  getShootY: () => number;
};

const shootFeature = <PR extends ProjectileBase>({
  projectileBuilder,
  getShootX,
  getShootY,
  shootRate,
  shootDamage,
}: ShootableProps<PR>): Shootable<PR> => {
  const shootable: Shootable<PR> = {
    projectileBuilder,
    shoot: function () {
      return this.projectileBuilder({
        damage: shootDamage,
        x: this.getShootX(),
        y: this.getShootY(),
      });
    },
    getShootX,
    getShootY,
    getProjectile: function () {
      return this.projectileBuilder;
    },
    setProjectile: function (projectile: ProjectileBuilder<PR>) {
      this.projectileBuilder = projectile;
    },
    getShootRate: function () {
      return shootRate;
    },
    setShootRate: function (rate: number) {
      shootRate = rate;
    },
  };

  return shootable;
};

export default shootFeature;
export type { Shootable, ShootableProps };
