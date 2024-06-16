import { Damageable } from '../takeDamage';

type Attackable = {
  attack: (target: Damageable) => void;
  getAttackSpeed: () => number;
  getDamage: () => number;
  setDamage: (damage: number) => void;
  setAttackSpeed: (attackSpeed: number) => void;
};

type AttackableProps = {
  damage: number;
  attackSpeed: number;
};

function attackFeature({ damage, attackSpeed }: AttackableProps): Attackable {
  return {
    attack(target: Damageable) {
      target.takeDamage(damage);
    },
    getAttackSpeed() {
      return attackSpeed;
    },
    setAttackSpeed(newAttackSpeed: number) {
      attackSpeed = newAttackSpeed;
    },
    setDamage(newDamage: number) {
      damage = newDamage;
    },
    getDamage() {
      return damage;
    },
  };
}

function isAttackable(entity: any): entity is Attackable {
  return 'attack' in entity;
}

export default attackFeature;
export { isAttackable };
export type { Attackable };
