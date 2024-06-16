import { createBase } from './';
import generateId from '@utils/idGenerator';

jest.mock('@utils/idGenerator');

describe('Base Entity', () => {
  beforeEach(() => {
    (generateId as jest.Mock).mockReturnValue('test-id');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a base entity with provided properties', () => {
    const baseProps = { name: 'Test Entity', x: 10, y: 20 };
    const base = createBase(baseProps);

    expect(base.getId()).toBe('test-id');
    expect(base.getName()).toBe('Test Entity');
    expect(base.getX()).toBe(10);
    expect(base.getY()).toBe(20);
  });

  it('should allow setting and getting x and y coordinates', () => {
    const baseProps = { name: 'Test Entity', x: 10, y: 20 };
    const base = createBase(baseProps);

    base.setX(30);
    base.setY(40);

    expect(base.getX()).toBe(30);
    expect(base.getY()).toBe(40);
  });

  it('should return the correct name and id', () => {
    const baseProps = { name: 'Test Entity', x: 10, y: 20 };
    const base = createBase(baseProps);

    expect(base.getName()).toBe('Test Entity');
    expect(base.getId()).toBe('test-id');
  });
});
