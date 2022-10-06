import React, { Fragment, useDebugValue, useState } from 'react';
import axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux'; /*For connecting redux */
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Link,Redirect } from 'react-router-dom';
/*for backend connection, http */
const Login = () => {
  const state=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  /*e.target.name will take the respective name of fields, if i put name:e.target.value then it will always change value opf name*/

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Redirecti if logged in
  if (state.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Signin to Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};
export default Login;
