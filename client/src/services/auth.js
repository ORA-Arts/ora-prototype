import axios from 'axios';

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

const Loggedin = async () => {
  try {
    const response = await axios.get('/api/auth/loggedin');
    // console.log("user", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
const signup = (username, password, userType) => {
  return axios.
    post('/api/auth/signup', { username, password, userType })
    .then(response => {
      console.log("response", response)
      return response.data
    })
    .catch(err => {
      console.log("err", err)
      return err.response.data
    })
}

const login = (username, password) => {
  console.log(username, password);
    return axios.
    post('/api/auth/login', { username, password })
    .then(response => {
      console.log("respond", response)
      return response.data
    })
    .catch(err => {
      console.log("err", err)
      return err.response.data
    })
}

const logout = () => {
  return axios.
    delete('/api/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data
    })
}



const addNewsletter = (email) => {
  console.log(email)
  return axios.
  post('http://localhost:5005/api/newsletter', {email})
  .then(response => {
    console.log("response", response)
    return response.data;
  })
  .catch(err => {
    console.log("err", err)
    return err.response.data
  })
}




export { signup, login, logout, Loggedin, addNewsletter };