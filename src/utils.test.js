import { sortAndCopyArray, addSort, setSort } from "./utils";

describe('sortArray', () => {
  
  it('1 field, ASC', () => {
    const arr = [
      {a: 1}, {a: 3}, {a: 2}, {a: 4}
    ];

    const arr1 = sortAndCopyArray(arr, [{field: "a", direction: "asc"}]);
    expect(arr1).toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 4}]);
  })  

  it('1 field, DESC', () => {
    const arr = [
      {a: 1}, {a: 3}, {a: 2}, {a: 4}
    ];

    let arr1 = sortAndCopyArray(arr, [{field: "a", direction: "desc"}]);
    expect(arr1).toEqual([{a: 4}, {a: 3}, {a: 2}, {a: 1}]);
  })
  
  it('2 field, ASC', () => {
    const arr = [
      {a:1, b:2}, {a:1, b:1}, {a:2, b:1}, {a:2, b:2}
    ];

    let arr1 = sortAndCopyArray(arr, [{field: "a", direction: "asc"}, {field: "b", direction: "asc"}]);
    expect(arr1).toEqual([{a:1, b:1}, {a:1, b:2}, {a:2, b:1}, {a:2, b:2}]);
  })

  it('2 field, ASC, DESC', () => {
    const arr = [
      {a:1, b:2}, {a:1, b:1}, {a:2, b:1}, {a:2, b:2}
    ];

    let arr1 = sortAndCopyArray(arr, [{field: "a", direction: "asc"}, {field: "b", direction: "desc"}]);
    expect(arr1).toEqual([{a:1, b:2}, {a:1, b:1}, {a:2, b:2}, {a:2, b:1}]);
  })  

})

describe('sort', () => {
  
  it('set sort new', () => {
    const order = [{field: 'a', direction: 'asc'}];
    const newOrder = setSort(order, 'b')
    expect(newOrder).toEqual([{field: 'b', direction: 'asc'}])
  })

  it('set sort change', () => {
    const order = [{field: 'a', direction: 'asc'}];
    const newOrder = setSort(order, 'a')
    expect(newOrder).toEqual([{field: 'a', direction: 'desc'}])
  })

  it('add sort new', () => {
    const order = [];
    const newOrder = addSort(order, 'a')
    expect(newOrder).toEqual([{field: 'a', direction: 'asc'}])
  })

  it('add sort change', () => {
    const order = [{field: 'a', direction: 'asc'}];
    const newOrder = addSort(order, 'a')
    expect(newOrder).toEqual([{field: 'a', direction: 'desc'}])
  })

  it('add sort add', () => {
    const order = [{field: 'a', direction: 'asc'}];
    const newOrder = addSort(order, 'b')
    expect(newOrder).toEqual([{field: 'a', direction: 'asc'}, {field: 'b', direction: 'asc'}])
  })

})