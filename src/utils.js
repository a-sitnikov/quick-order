import formatNumber from 'simple-format-number'

export const getFirebaseData = (ref) => {
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot) => {
      resolve(snapshot.val())
    })
  });
}

export const objectToArray = (obj, keyName = 'guid') => {
  return Object.keys(obj).map(key => {
    let item = obj[key];
    item[keyName] = key;
    return item;
  })
}

export const funcOrderBy = order => (a, b) => {
    
    for (let val of order) {
      if (a[val.field] > b[val.field]) {
        
        if (val.direction === "asc")
          return 1;
        else  
          return -1;

      } else if (a[val.field] < b[val.field]) {
        
        if (val.direction === "asc")
          return -1;
        else  
          return 1;
      }
    }

    return 0;
}

export const sortAndCopyArray = (array, order) => {
  return array.slice().sort(funcOrderBy(order))
}

export const changeDirection = orderDirection => orderDirection === "asc" ? "desc" : "asc";

export const setSort = (sort, field) => {

  const orderBy = sort.find(val => val.field === field) || {};
  const direction = changeDirection(orderBy.direction);

  return [{
    field,
    direction
  }];
}

export const addSort = (sort, field) => {
  
  const index = sort.findIndex(val => val.field === field);
  
  let newSort = sort.slice();
  if (index === -1) {
    newSort.push({ field, direction: "asc" });
  } else {
    newSort[index].direction = changeDirection(newSort[index].direction);
  }
  return newSort;
}

export const format = number => {
  if (typeof(number) === "number")
    return formatNumber(number, { fractionDigits: 2, symbols: { decimal: ',', grouping: '\xa0'}})  
  else 
    return number;
}