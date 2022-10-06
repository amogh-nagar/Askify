import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";

const Post = () => {
  const { post, loading } = useSelector((state) => ({
    post: state.post.post,
    loading: state.post.loading,
  }));
  const dispatch = useDispatch();
  const match = useParams();
console.log(';rendered post')
  useEffect(() => {
    dispatch(getPost(match.id));
  }, [getPost, match.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showactions={false} />
      <CommentForm postid={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postid={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
