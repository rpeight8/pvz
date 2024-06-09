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

export default takeDamageFeature;
export type { Damageable };
