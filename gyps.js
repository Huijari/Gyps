const Gyps = _ => {
  const gyps = Object.create(null);

  let last;
  gyps.emit = data => {
    last = data;
    return gyps;
  };
  gyps.observe = observer => {
    last ? observer(last) : null;
    const emit = gyps.emit;
    gyps.emit = data => {
      emit(data);
      observer(data);
      return gyps;
    };
    return gyps;
  };

  gyps.constant = value => gyps.map(_ => value);

  gyps.filter = predicate => {
    const filter = Gyps();
    gyps.observe(data => predicate(data) && filter.emit(data));
    return filter;
  };

  gyps.flatten = _ => {
    const flatten = Gyps();
    gyps.observe(stream => stream.observe(data => flatten.emit(data)));
    return flatten;
  };

  gyps.map = mapper => {
    const map = Gyps();
    gyps.observe(data => map.emit(mapper(data)));
    return map;
  };

  gyps.merge = (...streams) => {
    const merge = Gyps();
    [gyps, ...streams]
      .forEach(stream => stream.observe(data => merge.emit(data)));
    return merge;
  };

  gyps.scan = (reducer, initial) => {
    const scan = Gyps();
    let value = initial;
    gyps.observe(data => scan.emit(value = reducer(value, data)));
    return scan;
  };

  gyps.trigger = value$ => {
    const trigger = Gyps();
    let value;
    value$.observe(x => value = x);
    gyps.observe(_ => trigger.emit(value));
    return trigger;
  };

  gyps.wrap = key => gyps.map(value => ({ [key]: value }));

  return gyps;
};
