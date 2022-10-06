import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
const ProfileGithub = ({ username, repos }) => {
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [getGithubRepos,username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <ul>
              <li className='badge badge-primary'>
                Stars:{repo.stargazers_count}
              </li>
              <li className='badge badge-dark'>
                Watchers:{repo.watchers_count}
              </li>
              <li className='badge badge-light'>Forks:{repo.forks_count}</li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStatetoprops = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStatetoprops, { getGithubRepos })(ProfileGithub);
