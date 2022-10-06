import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; /*for link to actual single page of posts that will have comments */
import Moment from 'react-moment';
import { connect, useDispatch, useSelector } from 'react-redux'; /*we are going to have bunch pof actions like add like remove like etc */
import { addLike, removeLike, deletepost } from '../../actions/post';
const PostItem = ({
 
  post: { _id, text, name, avatar, user, likes, comments, date },
  showactions,
}) => {
const auth=useSelector((state)=>state.auth);
const dispatch=useDispatch()
  return <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      <p class='my-1'>{text}</p>
      <p class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {showactions && (
        <Fragment>
          <button
            onClick={(e) => dispatch(addLike(_id))}
            type='button'
            class='btn btn-light'
          >
            <i class='fas fa-thumbs-up' />{' '}
            <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={(e) => dispatch(removeLike(_id))}
            type='button'
            class='btn btn-light'
          >
            <i class='fas fa-thumbs-down' />
          </button>
          <Link to={`/post/${_id}`} class='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span class='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => dispatch(deletepost(_id))}
              type='button'
              class='btn btn-danger'
            >
              <i class='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
}; /*user is post user and auth.user._id is logged in user */
export default PostItem;