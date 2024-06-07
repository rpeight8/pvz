interface IZombie {
  id: number
  name: string
  health: number
  damage: number
  moveSpeed: number
  attackSpeed: number

  attack: () => void
  move: () => void
  takeDamage: (damage: number) => void
}

export default IZombie
