import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addpost } from '../../actions/post';
const PostForm = ({ addpost }) => {
  const [text, settext] = useState(
    ''
  ); /*as we have only one input in this form */

  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addpost({ text }); /*formdatas */
          settext('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => settext(e.target.value)}
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addpost: PropTypes.func.isRequired,
};

export default connect(null, { addpost })(PostForm);
/*as we are not bringing any state */
