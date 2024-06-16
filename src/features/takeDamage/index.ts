type Damageable = {
  takeDamage: (damage: number) => void;
  getHealth: () => number;
  setHealth: (health: number) => void;
};

function takeDamageFeature({ health }: { health: number }): Damageable {
  return {
    takeDamage(damage: number) {
      if (health) {
        health -= damage;
      }
    },
    getHealth() {
      return health;
    },
    setHealth(newHealth: number) {
      health = newHealth;
    },
  };
}

function isDamageable(entity: any): entity is Damageable {
  return 'takeDamage' in entity;
}

export default takeDamageFeature;
export { isDamageable };
export type { Damageable };
