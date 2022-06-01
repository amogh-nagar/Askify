import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import setAuthtoken from './utils/setAuthtoken';
import Dashboard from './components/dashboard/Dashboard';
import Createprofile from './components/profile-form/Createprofile';
import PrivateRoute from './components/routing/PrivateRoute';
import Editprofile from './components/profile-form/Editprofile';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import AddExperience from './components/profile-form/Addexperience';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthtoken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []); /*it will run once because of '[]' and it will keep on updating valuyes*/

  return (
    // So that all compoennts can access provider
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />

              <PrivateRoute exact path='/dashboard' component={Dashboard} />

              <PrivateRoute
                exact
                path='/create-profile'
                component={Createprofile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={Editprofile}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} />

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
