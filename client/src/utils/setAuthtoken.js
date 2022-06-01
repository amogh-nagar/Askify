import axios from 'axios';

const setAuthtoken = (token) => {
  if (token) {
    axios.defaults.headers.common[
      'x-auth-token'
    ] = token; /*If there is token set in browser then set the header x-auth-token */
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthtoken;
