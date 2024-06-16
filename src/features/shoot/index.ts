import type { ProjectileBase } from '@/entities/common/projectiles/ProjectileBase';

type ProjectileBuilder<PR> = ({ damage, x, y }: { damage: number; x: number; y: number }) => PR;

type Shootable<PR> = {
  shoot: () => PR;
  updateShooting: (ticks: number) => PR | undefined;
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
    updateShooting(ticks: number): PR | undefined {
      if (ticks === 1 || ticks % shootRate === 0) {
        return this.shoot();
      }
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

function isShootable<PR>(object: any): object is Shootable<PR> {
  return 'shoot' in object;
}

export default shootFeature;
export { isShootable };
export type { Shootable, ShootableProps };
