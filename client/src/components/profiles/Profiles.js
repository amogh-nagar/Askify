import React, {  useEffect } from 'react';

import Spinner from '../layout/Spinner';
import Profileitem from './Profileitem';
import { getProfiles } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
const Profiles = () => {
  const state=useSelector(state=>state.profile)
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [getProfiles]); /*as soonm as profile lopads we have to run getProfiles */

  return (
    <>
      {state.loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {state.profiles.length > 0 ? (
              state.profiles.map((profile) => (
                <Profileitem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found....</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
