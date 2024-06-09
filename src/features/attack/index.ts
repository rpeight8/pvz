type Damageable = {
  health: number;
  takeDamage: (damage: number) => void;
};

type Attackable = {
  damage: number;
  attackSpeed: number;
  attack: (target: Damageable) => void;
};

function attackFeature<T>({
  entity,
  damage,
  attackSpeed,
}: {
  entity: T;
  damage: number;
  attackSpeed: number;
}): T & Attackable {
  return {
    ...entity,
    damage,
    attackSpeed,
    attack(target: Damageable) {
      target.takeDamage(this.damage);
    },
  };
}

export default attackFeature;
