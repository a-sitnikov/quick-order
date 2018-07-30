import { sortArray } from "./utils";

describe('sortArray', () => {
  
  it('1 field, ASC', () => {
    const arr = [
      {a: 1}, {a: 3}, {a: 2}, {a: 4}
    ];

    const arr1 = sortArray(arr, [{field: "a", direction: "asc"}]);
    expect(arr1).toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 4}]);
  })  

  it('1 field, DESC', () => {
    const arr = [
      {a: 1}, {a: 3}, {a: 2}, {a: 4}
    ];

    let arr1 = sortArray(arr, [{field: "a", direction: "desc"}]);
    expect(arr1).toEqual([{a: 4}, {a: 3}, {a: 2}, {a: 1}]);
  })
  
  it('2 field, ASC', () => {
    const arr = [
      {a:1, b:2}, {a:1, b:1}, {a:2, b:1}, {a:2, b:2}
    ];

    let arr1 = sortArray(arr, [{field: "a", direction: "asc"}, {field: "b", direction: "asc"}]);
    expect(arr1).toEqual([{a:1, b:1}, {a:1, b:2}, {a:2, b:1}, {a:2, b:2}]);
  })

  it('2 field, ASC, DESC', () => {
    const arr = [
      {a:1, b:2}, {a:1, b:1}, {a:2, b:1}, {a:2, b:2}
    ];

    let arr1 = sortArray(arr, [{field: "a", direction: "asc"}, {field: "b", direction: "desc"}]);
    expect(arr1).toEqual([{a:1, b:2}, {a:1, b:1}, {a:2, b:2}, {a:2, b:1}]);
  })  

})