type Damageable = {
  takeDamage: (damage: number) => void;
  getHealth: () => number;
  setHealth: (health: number) => void;
};

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

export default attackFeature;
