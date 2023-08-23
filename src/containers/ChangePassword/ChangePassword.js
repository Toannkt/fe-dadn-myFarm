/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { changePasswordService } from "../../services/userService";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import "./ChangePassword.scss";
import { Fragment } from "react";
// import { userLoginSuccess } from '../../store/actions';

class ChangePassword extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  password: "",
                  newPassword: "",
                  confirmPassword: "",
                  isShowPassword: false,
                  isShowNewPassword: false,
                  isShowConfirmPassword: false,
                  errMessage: "",
            };
            this.btnLogin = React.createRef();
      }
      handleOnChangeInput = (e, type) => {
            let copyState = { ...this.state };
            copyState[type] = e.target.value;
            this.setState({
                  ...copyState,
            });
      };
      handleChangePassword = async () => {
            let data = {
                  id: this.props.userInfo.user.id,
                  password: this.state.password,
                  newPassword: this.state.newPassword,
                  confirmPassword: this.state.confirmPassword,
            };
            console.log(data);
            const result = await changePasswordService(data);
            if (result && result.errCode !== 0) {
                  this.setState({
                        errMessage: result.message,
                  });
            } else {
                  alert("Thay đổi mật khẩu thành công!");
                  this.setState({
                        password: "",
                        newPassword: "",
                        confirmPassword: "",
                        errMessage: "",
                  });
            }
      };
      handleShowPassword = () => {
            this.setState({
                  isShowPassword: false ? true : false,
            });
      };
      handleShowNewPassword = () => {
            this.setState({
                  isShowNewPassword: false ? true : false,
            });
      };
      handleShowConfirmPassword = () => {
            this.setState({
                  isShowConfirmPassword: false ? true : false,
            });
      };
      handleKeydown = (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                  this.handleLogin();
            }
      };
      render() {
            console.log("this.state.password: ", this.state.password);
            return (
                  <Fragment>
                        <HomeHeader />
                        <div className='login-container'>
                              <div className='login-left'>
                                    <div className='login-content'>
                                          <div className='col-12 text-login'>Thay đổi mật khẩu</div>
                                          <div className='col-12 form-group login-input'>
                                                <label>Mật khẩu của bạn</label>
                                                <div className='custom-form-password'>
                                                      <input
                                                            type='password'
                                                            name='password'
                                                            className='form-control input-password'
                                                            placeholder='Nhập mật khẩu của bạn'
                                                            value={this.state.password}
                                                            onChange={(event) =>
                                                                  this.handleOnChangeInput(event, "password")
                                                            }
                                                            onKeyDown={(event) => this.handleKeydown(event)}
                                                      ></input>
                                                      <i
                                                            className='fas fa-eye-slash icon-eye'
                                                            onClick={() => {
                                                                  this.handleShowPassword();
                                                                  const iconEye = document.querySelector(".icon-eye");
                                                                  const isShow = iconEye.classList.contains("fa-eye");
                                                                  if (isShow) {
                                                                        document.querySelector(".input-password").type =
                                                                              "password";
                                                                        iconEye.classList.remove("fa-eye");
                                                                        iconEye.classList.add("fa-eye-slash");
                                                                  } else {
                                                                        document.querySelector(".input-password").type =
                                                                              "text";
                                                                        iconEye.classList.remove("fa-eye-slash");
                                                                        iconEye.classList.add("fa-eye");
                                                                  }
                                                            }}
                                                      ></i>
                                                </div>
                                          </div>
                                          <div className='col-12 form-group login-input'>
                                                <label>Mật khẩu mới</label>
                                                <div className='custom-form-password'>
                                                      <input
                                                            type='password'
                                                            name='newPassword'
                                                            className='form-control input-new-password'
                                                            placeholder='Nhập vào mật khẩu mới'
                                                            value={this.state.newPassword}
                                                            onChange={(event) =>
                                                                  this.handleOnChangeInput(event, "newPassword")
                                                            }
                                                            onKeyDown={(event) => this.handleKeydown(event)}
                                                      ></input>
                                                      <i
                                                            className='fas fa-eye-slash icon-eye'
                                                            onClick={() => {
                                                                  this.handleShowNewPassword();
                                                                  const iconEye = document.querySelector(".icon-eye");
                                                                  const isShow = iconEye.classList.contains("fa-eye");
                                                                  if (isShow) {
                                                                        document.querySelector(
                                                                              ".input-new-password",
                                                                        ).type = "password";
                                                                        iconEye.classList.remove("fa-eye");
                                                                        iconEye.classList.add("fa-eye-slash");
                                                                  } else {
                                                                        document.querySelector(
                                                                              ".input-new-password",
                                                                        ).type = "text";
                                                                        iconEye.classList.remove("fa-eye-slash");
                                                                        iconEye.classList.add("fa-eye");
                                                                  }
                                                            }}
                                                      ></i>
                                                </div>
                                          </div>
                                          <div className='col-12 form-group login-input'>
                                                <label>Mật khẩu mới</label>
                                                <div className='custom-form-password'>
                                                      <input
                                                            type='password'
                                                            name='confirmPassword'
                                                            className='form-control input-confirm-password'
                                                            placeholder='Nhập lại mật khẩu mới'
                                                            value={this.state.confirmPassword}
                                                            onChange={(event) =>
                                                                  this.handleOnChangeInput(event, "confirmPassword")
                                                            }
                                                            onKeyDown={(event) => this.handleKeydown(event)}
                                                      ></input>
                                                      <div className='col-12' style={{ color: "red" }}>
                                                            {this.state.errMessage}
                                                      </div>
                                                      <i
                                                            className='fas fa-eye-slash icon-eye'
                                                            onClick={() => {
                                                                  this.handleShowConfirmPassword();
                                                                  const iconEye = document.querySelector(".icon-eye");
                                                                  const isShow = iconEye.classList.contains("fa-eye");
                                                                  if (isShow) {
                                                                        document.querySelector(
                                                                              ".input-confirm-password",
                                                                        ).type = "password";
                                                                        iconEye.classList.remove("fa-eye");
                                                                        iconEye.classList.add("fa-eye-slash");
                                                                  } else {
                                                                        document.querySelector(
                                                                              ".input-confirm-password",
                                                                        ).type = "text";
                                                                        iconEye.classList.remove("fa-eye-slash");
                                                                        iconEye.classList.add("fa-eye");
                                                                  }
                                                            }}
                                                      ></i>
                                                </div>
                                          </div>
                                          <div className='col-12'>
                                                <button
                                                      className='btn-change-password'
                                                      onClick={() => this.handleChangePassword()}
                                                >
                                                      Thay đổi mật khẩu
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <Footer />
                  </Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            lang: state.app.language,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            navigate: (path) => dispatch(push(path)),
            addUserSuccess: (userInfo) => dispatch(actions.addUserSuccess(userInfo)),
            userLoginFail: () => dispatch(actions.userLoginFail()),
            userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
