import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Moment from 'react-moment'; /*for handling dates */
import { deleteEducation } from "../../actions/profile";
const Education = ({ education}) => {
const dispatch=useDispatch()

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYY?MM?DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? 'Now' : <Moment format='YYY?MM?DD'>{edu.to}</Moment>}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(edu._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Creadentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />{' '}
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  ); /*  <th /> for button */
};
export default Education
