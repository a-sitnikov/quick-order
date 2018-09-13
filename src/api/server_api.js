class ServerApi {

  constructor(params) {
    this.initialize(params.url);
  }

  initialize = (url) => {
    this.url = url;
  }

  login = async (email, password) => {
  }

  logout = () => {
  }

  getCatalog = async () => {

  }
}

export default ServerApi;