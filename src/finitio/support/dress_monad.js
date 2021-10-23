class DressMonad {

  constructor(world, result, error) {
    this.world = world;
    this.result = result;
    this.error = error;
  }

  success(result) {
    return new DressMonad(this.world, result, undefined);
  }

  failure(context, error, causes) {
    error = { error };
    if (causes != null) { error.children = causes; }
    return new DressMonad(this.world, undefined, error);
  }

  find(collection, callback, onFailure) {
    const causes = [];
    for (const [i, element] of collection.entries()) {
      const m = callback(element, i);
      if (m.isSuccess()) {
        return m;
      } else {
        if (m.error.location == null) { setErrorLocation(m.error, element, i); }
        causes.push(m.error);
      }
    }
    return onFailure(causes);
  }

  refine(base, collection, callback, onFailure) {
    if (base.isSuccess()) {
      const causes = [];
      for (const [i, element] of collection.entries()) {
        const m = callback(base, element, i);
        if (m.isFailure()) {
          if (m.error.location == null) { setErrorLocation(m.error, element, i); }
          causes.push(m.error);
          if (this.isFailfast()) { break; }
        }
      }
      if (causes.length === 0) { return base; }
      return onFailure(causes);
    } else {
      return onFailure([base.error]);
    }
  }

  map(collection, mapper, onFailure) {
    const result = [];
    const success = this.success(result);
    const callback = function(_, elm, index) {
      const m = mapper(elm, index);
      return m.onSuccess((elmResult) => {
        result.push(elmResult);
        return m;
      });
    };
    return this.refine(success, collection, callback, onFailure);
  }

  isFailfast() {
    return this.world && this.world.failfast;
  }

  isSuccess() {
    return this.error === undefined;
  }

  isFailure() {
    return !this.isSuccess();
  }

  onSuccess(callback) {
    if (!this.isSuccess()) { return this; }
    return callback(this.result);
  }

  onFailure(callback) {
    if (this.isSuccess()) { return this; }
    return callback(this.error);
  }
}

const setErrorLocation = function(error, element, index) {
  let loc = element.name;
  if (loc == null) { loc = index; }
  return error.location = loc;
};

export default DressMonad;
