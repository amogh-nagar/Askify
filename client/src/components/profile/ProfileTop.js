import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x' />
          </a>
          //   target="_blank" opens in new tab
        )}
        {social &&
          Object.entries(social)
            .filter(([key, value]) => value)
            .map(([key, value]) => (
              <a
                key={key}
                href={value}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className={`fab fa-${key} fa-2x`}></i>
              </a>
            ))}
      </div>
    </div>
  );
};

/*We can also use this ->
{social && social.twitter && (
    <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
      <i className='fab fa-twitter fa-2x' />{' '}
    </a>
  )} */

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
