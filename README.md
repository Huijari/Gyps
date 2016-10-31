# Gyps
> Cheap reactive programming library

## API
### Emit
Emit an event, calling all observers.

### Observe
Add a new observer. If an event was emitted before, the observer is called with the last value.

### Constant
Map all values to a constant.

### Filter
Only emit values that pass the predicate.

### Flatten
Transform a observable of observables into a observable of values emitted by values of the original observable.

### Map
Transform each value by a function.

### Merge
Combine multiple observables into one.

### Scan
Accumulate values using a function.

### Trigger
Takes an observable of values, each time the original observable emits, this observable emits the last value emitted by the observable of values.

### Wrap
Wrap each value into an object with the key provided.

## Meta
This project is based on [eye](https://github.com/huijari/eye).

Distributed under MIT license. See ``LICENSE`` for more information.

[Huijari](https://github.com/Huijari)
