class Lazy {
  computations = [];

  add = (callback, ...rest) => {
    this.computations.push({
      callback,
      args: rest,
    });

    return this;
  };

  evaluate = (input) => {
    if (!this.computations.length) {
      return input;
    }

    return input.map((item) => (
      this.computations.reduce((acc, curr) => curr.callback.apply(null, [...curr.args, acc]), item)
    ));
  };

  clear = () => {
    this.computations = [];

    return this;
  };
}

export default Lazy;
