/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import AboutUsImg from "../../assets/about_us.png";
import "./AboutUs.scss";
class AboutUs extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      render() {
            return (
                  <Fragment>
                        <div className='background-image'>
                              <HomeHeader />
                              <div className='introduce-about'>
                                    <img src={AboutUsImg} alt='introduce about us' className='intro-about-us' />
                              </div>
                              <Footer />
                        </div>
                  </Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
