import Lazy from '..';

describe('LazyEvaluation', () => {
  let lazy;

  it('should return the given input if no computation was registered', () => {
    lazy = new Lazy();
    expect(lazy.evaluate([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return the evaluated input given the added computations (added computations does not receive any params)', () => {
    lazy = new Lazy();
    lazy.add(Math.sqrt);
    expect(lazy.evaluate([1, 4, 9, 16])).toEqual([1, 2, 3, 4]);

    lazy = new Lazy();
    lazy.add((x) => x + 1);
    expect(lazy.evaluate([1, 2, 3])).toEqual([2, 3, 4]);

    lazy = new Lazy();
    lazy.add(Math.sqrt);
    lazy.add((x) => x + 1);
    expect(lazy.evaluate([1, 4, 9])).toEqual([2, 3, 4]);

    lazy = new Lazy();
    expect(lazy
      .add(Math.sqrt)
      .add((x) => x + 1)
      .evaluate([1, 4, 9])).toEqual([2, 3, 4]);
  });

  it('should return the evaluated input given the added computations (added computations will be given some params)', () => {
    lazy = new Lazy();
    lazy.add((x, y) => x + y, 1);
    expect(lazy.evaluate([1, 2, 3])).toEqual([2, 3, 4]);

    lazy = new Lazy();
    lazy.add((x, y) => x + y, 1);
    lazy.add((x, y, z) => x + y + z, 2, 3);
    expect(lazy.evaluate([1, 2, 3])).toEqual([7, 8, 9]);

    lazy = new Lazy();
    lazy.add(Math.sqrt);
    lazy.add((x, y) => x + y, 1);
    lazy.add((x, y, z) => x + y + z, 4, 3);
    expect(lazy.evaluate([1, 4, 9])).toEqual([9, 10, 11]);

    lazy = new Lazy();
    expect(lazy
      .add((x) => x * 2)
      .add((x, y) => x + y, 1)
      .evaluate([1, 2, 3])).toEqual([3, 5, 7]);
  });

  it('should return the evaluated input if the computations list was cleared', () => {
    lazy = new Lazy();
    lazy.add((x, y) => x + y, 1);
    expect(lazy.evaluate([1, 2, 3])).toEqual([2, 3, 4]);

    lazy.clear();
    expect(lazy.evaluate([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
