import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2p.jpg";
import img1c from "../../assets/1c.png";
import img2c from "../../assets/2c.svg";
import img3c from "../../assets/3c.svg";
const Landing = () => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const [rd, setrd] = useState(false);
  if (rd) {
    return <Redirect to="/register" />;
  }
  return (
    <section className="landing">
      <div className="landing-inner">
        <div className="text">
          <h1 className="x-large">Asking questions improves your learning</h1>
          <p className="lead">
            Every month Over a Millions of Users find Answers to their
            Questions, We hope you find yours too.
          </p>
          <div className="links">
            <p> Come Join us</p>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                setrd(true);
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div className="img">
          <img src={img1} alt="" />
        </div>
      </div>
      <div className="para2">
        <div className="img">
          <img src={img2} alt="" />
        </div>
        <div className="text">
          <h1 className="m-large">Confused about some topic?</h1>
          <p>Get your question posted and let the world know about it.</p>
        </div>
      </div>
      <div className="paralist">
        <h1 className="m-large">How asking questions helps you grow?</h1>
        <div className="pl">
          <div className="img1">
            <img src={img1c} alt="" />
            <p>Peer Programming</p>
          </div>
          <div className="img1">
            <img src={img3c} alt="" />
            <p>Doubts solve</p>
          </div>
          <div className="img1">
            <img src={img2c} alt="" />
            <p>Making cool stuff</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
