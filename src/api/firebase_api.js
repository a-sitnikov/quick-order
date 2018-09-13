import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

class FirebaseApi {

  constructor(params) {
    this.initialize(params.apiKey, params.databaseURL);
  }

  initialize = (apiKey, databaseURL) => {
    if (firebase.apps.length === 0)
      firebase.initializeApp({ apiKey, databaseURL });
  }

  getData = ref => {
    return new Promise((resolve, reject) => {
      ref.once('value', (snapshot) => {
        resolve(snapshot.val())
      })
    });
  }

  login = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout = () => {
    firebase.auth().signOut();
  }

  getUserInfo = async (uid) => {
    const ref = firebase.database().ref(`users/${uid}`);
    return this.getData(ref);
  }

  getCatalog = async (priceType) => {
    
    const refItems  = firebase.database().ref('items');
    const refGroups = firebase.database().ref('groups');
    const refPrices = firebase.database().ref(`prices/${priceType}`);
    
    const [items, groups, prices] = await Promise.all([
      this.getData(refItems),
      this.getData(refGroups),
      this.getData(refPrices)
    ]);
    
    return {
      items,
      groups,
      prices
    }
  }

  getOrders = async () => {

  }

}

export default FirebaseApi