import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
          <string>Position: </string>{title}
      </p>
      <p>
      <strong>Location: </strong> {location}
    </p>
      <p>
          <strong>Description: </strong>{description}
      </p>
    </div>
  );
};

export default ProfileExperience;
