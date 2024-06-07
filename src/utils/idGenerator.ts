function* bigIntIdGenerator(
  start: bigint = 0n,
  max: bigint = BigInt(Number.MAX_SAFE_INTEGER),
): Generator<bigint, bigint, unknown> {
  let currentId = start
  while (true) {
    if (currentId > max) {
      currentId = start // Reset or handle overflow
    }
    yield (currentId += 1n)
  }
}

const generator = bigIntIdGenerator(0n)

const generateId = (): bigint => generator.next().value

export default generateId
