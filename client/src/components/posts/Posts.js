import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";

const Posts = () => {
  const { posts, loading } = useSelector((state) => ({
    posts: state.post.posts,
    loading: state.post.loading,
  }));
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
