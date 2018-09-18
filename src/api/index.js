import FirebaseApi from './firebase_api'
import ServerApi from './server_api'
import LocalDB from './localdb'

export function getRemoteDB(type, params) {

  if (type === 'firebase' && params.apiKey)
    return new FirebaseApi(params);

  else if (type === 'server' && params.url)
    return new ServerApi(params);

}

export function getLocalDB() {

  return new LocalDB();

}