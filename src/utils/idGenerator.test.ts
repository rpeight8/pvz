import generateId from './idGenerator';

describe('idGenerator', () => {
  it('should generate unique values', () => {
    const idSet = new Set();
    for (let i = 0; i < 1000; i++) {
      idSet.add(generateId());
    }
    expect(idSet.size).toBe(1000);
  });

  it('should generate string values', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
  });

  it('should generate values of a certain length', () => {
    const id = generateId();
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate different values for consecutive calls', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});
