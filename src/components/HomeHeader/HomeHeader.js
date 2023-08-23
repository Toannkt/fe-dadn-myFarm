/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";
import userIcon from "../../assets/icon_profile.png";
import { LogoutOutlined, SettingFilled, UserOutlined } from "@ant-design/icons";

import "./HomeHeader.scss";
class HomeHeader extends Component {
      processLogin = () => {
            const { navigate } = this.props;
            const redirectPath = "/login";
            navigate(`${redirectPath}`);
      };
      navigateHome = () => {
            const { navigate } = this.props;
            const redirectPath = "/";
            navigate(`${redirectPath}`);
      };
      navigateAboutUs = () => {
            const { navigate } = this.props;
            const redirectPath = "/about-us";
            navigate(`${redirectPath}`);
      };
      navigateContact = () => {
            const { navigate } = this.props;
            const redirectPath = "/contact";
            navigate(`${redirectPath}`);
      };
      navigateMyFarm = () => {
            const { navigate } = this.props;
            const redirectPath = "/my-farm";
            navigate(`${redirectPath}`);
      };
      navigateChangeProfile = () => {
            const { navigate } = this.props;
            const redirectPath = "/change-profile";
            navigate(`${redirectPath}`);
      };
      navigateChangePassword = () => {
            const { navigate } = this.props;
            const redirectPath = "/change-password";
            navigate(`${redirectPath}`);
      };
      navigateLogout = () => {
            this.props.processLogout();
            const { navigate } = this.props;
            const redirectPath = "/";
            navigate(`${redirectPath}`);
      };
      render() {
            const linkName = window.location.pathname.split("/")[1];
            const { userInfo } = this.props;
            return (
                  <React.Fragment>
                        <div className='home-header-container'>
                              <div className='home-header-content'>
                                    <div className='left-content'>
                                          <div className='header-logo'></div>
                                    </div>
                                    <div className='center-content'>
                                          {userInfo !== null ? (
                                                <div
                                                      className='my-farm'
                                                      style={{ color: linkName === "my-farm" ? "white" : "black" }}
                                                      onClick={this.navigateMyFarm}
                                                >
                                                      {" "}
                                                      My Farm
                                                </div>
                                          ) : (
                                                <div
                                                      className='home'
                                                      style={{ color: linkName === "" ? "white" : "black" }}
                                                      onClick={this.navigateHome}
                                                >
                                                      Home
                                                </div>
                                          )}
                                          <div
                                                className='about'
                                                style={{ color: linkName === "about-us" ? "white" : "black" }}
                                                onClick={this.navigateAboutUs}
                                          >
                                                About Us
                                          </div>
                                          <div
                                                className='contact'
                                                style={{ color: linkName === "contact" ? "white" : "black" }}
                                                onClick={this.navigateContact}
                                          >
                                                Contact
                                          </div>
                                    </div>
                                    <div className='right-content'>
                                          {/* nút logout */}
                                          <div className='btn'>
                                                {userInfo !== null ? (
                                                      <div className='user-setting'>
                                                            <h2>Hello, {userInfo.user.firstName}</h2>
                                                            <img src={userIcon} alt='user icon'></img>
                                                            <div className='option-setting'>
                                                                  <div
                                                                        className='option-profile'
                                                                        style={{
                                                                              color:
                                                                                    linkName === "change-profile"
                                                                                          ? "blue"
                                                                                          : "rgb(85, 83, 83)",
                                                                        }}
                                                                        onClick={this.navigateChangeProfile}
                                                                  >
                                                                        <UserOutlined
                                                                              style={{
                                                                                    fontSize: "20px",
                                                                                    color: "rgb(85, 83, 83)",
                                                                                    marginRight: "8px",
                                                                              }}
                                                                        />
                                                                        <div
                                                                              className='setting-profile'
                                                                              style={{
                                                                                    fontSize: "16px",
                                                                              }}
                                                                        >
                                                                              Thay đổi thông tin
                                                                        </div>
                                                                  </div>
                                                                  <div
                                                                        className='option-password'
                                                                        style={{
                                                                              color:
                                                                                    linkName === "change-password"
                                                                                          ? "blue"
                                                                                          : "rgb(85, 83, 83)",
                                                                        }}
                                                                        onClick={this.navigateChangePassword}
                                                                  >
                                                                        <SettingFilled
                                                                              style={{
                                                                                    fontSize: "20px",
                                                                                    color: "rgb(85, 83, 83)",
                                                                                    marginRight: "8px",
                                                                              }}
                                                                        />
                                                                        <div
                                                                              className='setting-password'
                                                                              style={{
                                                                                    fontSize: "16px",
                                                                              }}
                                                                        >
                                                                              Thay đổi mật khẩu
                                                                        </div>
                                                                  </div>
                                                                  <div
                                                                        className='btn-logout'
                                                                        onClick={() => this.navigateLogout()}
                                                                  >
                                                                        <LogoutOutlined
                                                                              style={{
                                                                                    fontSize: "20px",
                                                                                    color: "rgb(85, 83, 83)",
                                                                                    marginRight: "8px",
                                                                              }}
                                                                        />
                                                                        <div
                                                                              className='logout'
                                                                              style={{
                                                                                    fontSize: "16px",
                                                                              }}
                                                                        >
                                                                              Đăng suất
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ) : (
                                                      <div className='btn-login' onClick={this.processLogin}>
                                                            <div className='login'>Login</div>
                                                      </div>
                                                )}
                                          </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
