declare interface String {
  isEmpty(): boolean
}

declare interface Number {
  isGreaterThanZero(number: number): boolean
}

String.prototype.isEmpty = function (this: string) {
  return this.length === 0 || this === '';
}

Number.prototype.isGreaterThanZero = function (number: number) {
  return number > 0;
}

declare interface Array<T> {
  take(count: number): Array<T>;
  orderBy<TSelector>(selector: (elem: T) => TSelector): Array<T>;
  orderByDescending<TSelector>(selector: (elem: T) => TSelector): Array<T>;
  groupBy<TSelector>(selector: (elem: T) => TSelector): { key: string, values: T[] };
  selectMany<TSelector>(selector: (elem: T) => TSelector[]): Array<TSelector>;
  distinct(selector?: (elem: T) => T): Array<T>;
  isEmpty(): boolean;
  remove<T>(object: T): boolean;
}


Array.prototype.take = function <T>(this: Array<T>, count: number) {
  return count ? this.filter((v, i) => i < count) : this;
}

Array.prototype.orderBy = function <T, TSelector>(this: Array<T>, selector: (elem: T) => TSelector) {

  var mappedArray = this.map((v, i) => {
    return { index: i, value: selector(v) }
  });

  mappedArray.sort((a, b) => {
    if (a.value > b.value) return 1;
    else if (a.value == b.value) return 0;
    else return -1;
  });
  return mappedArray.map((v) => this[v.index]);
}

Array.prototype.orderByDescending = function <T, TSelector>(this: Array<T>, selector: (elem: T) => TSelector) {
  var mappedArray = this.map((v, i) => {
    return { index: i, value: selector(v) }
  });

  mappedArray.sort((a, b) => {
    if (a.value < b.value) return 1;
    else if (a.value == b.value) return 0
    else return -1;
  });

  return mappedArray.map((v) => this[v.index]);
}

Array.prototype.selectMany = function <T, TSelector>(this: Array<T>, selector: (elem: T[]) => TSelector[]) {
  return this.reduce((pv: any, cv: any) => [...pv, ...selector(cv)], []);
}

Array.prototype.distinct = function <T>(this: Array<T>, selector?: (elem: T) => T) {
  if (selector)
    return this.filter((v, i, arr) => arr.indexOf(selector(v)) === i);
  else
    return this.filter((v, i, arr) => arr.indexOf(v) === i);

}

Array.prototype.isEmpty = function <T>(this: Array<T>) {
  return this.length === 0;
}

Array.prototype.remove = function <T>(this: Array<T>, object: T) {
  const index = this.indexOf(object);
  if (index === -1)
    return false;

  this.splice(index, 1);
  return true;
};
