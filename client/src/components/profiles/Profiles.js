import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Profileitem from './Profileitem';
import { getProfiles } from '../../actions/profile';
const Profiles = ({ getProfiles, profile:{ profiles,loading}}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]); /*as soonm as profile lopads we have to run getProfiles */

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Profileitem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found....</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
//   loading:PropTypes.object.isRequired,
};

const mapStatetoprops = (state) => ({
  profile: state.profile,
});
export default connect(mapStatetoprops, { getProfiles })(Profiles);
