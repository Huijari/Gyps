const Gyps = _ => {
  const gyps = Object.create(null);

  let last;

  /* Emit an event, calling all observers.
   * @param data Data object to be used on calling observers
   */
  gyps.emit = data => {
    last = data;
    return gyps;
  };

  /* Observe
   */
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

  /* Constant
   */
  gyps.constant = value => gyps.map(_ => value);

  /* Filter
   */
  gyps.filter = predicate => {
    const filter = Gyps();
    gyps.observe(data => predicate(data) && filter.emit(data));
    return filter;
  };

  /* Flatten
   */
  gyps.flatten = _ => {
    const flatten = Gyps();
    gyps.observe(stream => stream.observe(data => flatten.emit(data)));
    return flatten;
  };

  /* Map
   */
  gyps.map = mapper => {
    const map = Gyps();
    gyps.observe(data => map.emit(mapper(data)));
    return map;
  };

  /* Merge
   */
  gyps.merge = (...streams) => {
    const merge = Gyps();
    [gyps, ...streams]
      .forEach(stream => stream.observe(data => merge.emit(data)));
    return merge;
  };

  /* Scan
   */
  gyps.scan = (reducer, initial) => {
    const scan = Gyps();
    let value = initial;
    gyps.observe(data => scan.emit(value = reducer(value, data)));
    return scan;
  };

  /* Trigger
   */
  gyps.trigger = value$ => {
    const trigger = Gyps();
    let value;
    value$.observe(x => value = x);
    gyps.observe(_ => trigger.emit(value));
    return trigger;
  };

  /* Wrap
   */
  gyps.wrap = key => gyps.map(value => ({ [key]: value }));

  return gyps;
};
