/** @format */
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import React, { Component } from "react";
import callIcon from "../../assets/icon_call.png";
import fbIcon from "../../assets/icon_facebook.png";
import insIcon from "../../assets/icon_instagram.png";
import shoppingcartIcon from "../../assets/icon_shoppingcart.png";
import youtubeIcon from "../../assets/icon_youtube.png";
import leafIcon from "../../assets/leaf_icon.png";
import "./footer.scss";
class Footer extends Component {
      render() {
            return (
                  <React.Fragment>
                        <div className='footer'>
                              <div className='above'>
                                    <div className='left'>
                                          <img src={leafIcon} alt='leaf-icon' />
                                          <h1>MY FARM</h1>
                                    </div>
                                    <div className='between'>EMAIL: toan.nguyenkhactoan432@hcmut.edu.vn</div>
                                    <div className='right'>Phone number: 0353846079</div>
                              </div>
                              <div className='under'>
                                    <div className='icons'>
                                          <img src={fbIcon} alt='fb icon' />
                                          <img src={youtubeIcon} alt='youtube icon' />
                                          <img src={insIcon} alt='ins icon' />
                                          <img src={shoppingcartIcon} alt='shopping cart icon' />
                                          <img src={callIcon} alt='call icon' />
                                    </div>
                                    <div className='final-page'>© 2023. Design by Group</div>
                              </div>
                        </div>
                  </React.Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            lang: state.app.language,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            navigate: (path) => dispatch(push(path)),
            processLogout: () => dispatch(actions.processLogout()),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
