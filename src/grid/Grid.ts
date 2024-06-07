interface Grid {
  rows: number
  columns: number
  grid: {
    zombies: []
    plants: []
    projectiles: []
  }[]
}

const createGrid = (rows: number, columns: number) => {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => 0),
  )

  return grid
}
