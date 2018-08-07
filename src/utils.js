
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

export const sortArray = (array, order) => {
  return array.map(x => x).sort((a, b) => {
    
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
  })
}