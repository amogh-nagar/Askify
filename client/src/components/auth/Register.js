import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';
/*for backend connection, http */
const Register = ({ setAlert, register, isAuthenticated }) => {
  /*destructured it */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  /*e.target.name will take the respective name of fields, if i put name:e.target.value then it will always change value opf name*/

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert(
        'password do not match',
        'danger',
        3000
      ); /*danger is alertType */
      /*   const newUser = {
        name,
        email,
        password,
      }; /*same as doing name:name,email:email */

      /*    try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);

    /*    const res = await axios.post(
          '/api/user',
          body,
          config
        ); /*we will hit http://localhost:4000/api/user */
      /* console.log(res.data); /*will print token */
      /*  } catch (err) {
        console.error(err.response.data);
      } */
    } else {
      register({ name, email, password });
    }
  };

  // Redirect after sign up
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert:
    PropTypes.func.isRequired /*func->data type as setAlert is function */,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
// whenver we vbring action   any state

const mapStatetoprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStatetoprops, { setAlert, register })(
  Register
); /*whwnever we use connect we have to do this */
