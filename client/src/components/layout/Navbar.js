import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const Navbar = () => {
  const dispatch=useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  }));
  const history = useHistory();
  const authLinks = (
    <ul className="auth-ul">
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li style={{ cursor: "pointer" }}>
        <button className="login" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm" color="white">
            {" "}
            Logout
          </span>
        </button>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="guest-ul">
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <button
        className="login"
        onClick={() => {
          history.push("/login");
        }}
        style={{ cursor: "pointer" }}
      >
        Login
      </button>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Askify
        </Link>
      </h1>
      {!loading && (
        <div className="cnt-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      )}
    </nav>
  ); /*if user has logged in then loading will be false so !loading will be true */
};

export default Navbar;
