/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import mapContact from "../../assets/map-contact.png";
import "./Contact.scss";
class Contact extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      render() {
            return (
                  <Fragment>
                        <div className='background-image'>
                              <HomeHeader />
                              <div className='contact-us'>
                                    <div className='left'>
                                          <h2>Contact</h2>
                                          <input className='title-contact' placeholder='Tiêu đề'></input>
                                          <input className='your-phone-number' placeholder='Số liên hệ của bạn'></input>
                                          <textarea className='content-res' placeholder='Nội dung'></textarea>
                                          <button className='submit-contact'>Gửi</button>
                                    </div>
                                    <div className='right'>
                                          <div className='contact-image'>
                                                <img src={mapContact} className='map-contact' alt='map' />
                                          </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
