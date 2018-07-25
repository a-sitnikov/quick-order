
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

export const sortArray = (array, orderBy, order) => {
  return array.map(x => x).sort((a, b) => {
    if (order === 'asc')
      return a[orderBy] > b[orderBy] ? 1 : -1
    else  
      return a[orderBy] < b[orderBy] ? 1 : -1
  })
}