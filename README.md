# Lazy evaluation

# Installing

```
yarn install
```

# Tests

To run the tests

```
yarn test
```

# Usage

## Instantiate

```js
import Lazy from 'lazy';

const lazy = new Lazy();
```

## Add computation

### add(fn, [...args])

```js
lazy.add(Math.sqrt);

lazy.add((x, y) => x + y, 1);
```

## Evaluate

### evaluate(array) => returns the computed array

```js
lazy.evaluate([1, 2, 3, 4]);
```

## Example

```js
lazy
  .add((x) => x * 2)
  .add((x, y) => x + y, 1)
  .evaluate([1, 2, 3]);

// returns [3, 5, 7];
```
