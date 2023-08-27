/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import rightLogin from "../../assets/right-login.png";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import "./ForgotPassword.scss";
import { Fragment } from "react";
import { forgotPasswordService } from "../../services/userService";
import ReturnLogin from "../../assets/return-login.png";
class ForgotPassword extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  email: "",
                  isShowPassword: false,
                  errMessage: "",
            };
            this.btnLogin = React.createRef();
      }
      handleOnChangeEmail = (event) => {
            this.setState({
                  email: event.target.value,
            });
      };
      handleForgotPassword = async (email) => {
            this.setState({
                  errMessage: "",
            });
            try {
                  let data = await forgotPasswordService(email);
                  console.log(data);
                  if (data && data.errCode !== 0) {
                        this.setState({
                              errMessage: data.message,
                        });
                  }
                  if (data && data.errCode === 0) {
                        alert("Lấy lại mật khẩu thành công, vui lòng kiểm tra email của bạn!");
                        this.processReturnLogin();
                  }
            } catch (e) {
                  if (e.response) {
                        this.setState({
                              errMessage: e.response.data.message,
                        });
                  }
            }
      };
      processReturnLogin = () => {
            const { navigate } = this.props;
            const redirectPath = "/login";
            navigate(`${redirectPath}`);
      };
      render() {
            return (
                  <Fragment>
                        <HomeHeader />
                        <div className='forgot-container'>
                              <div className='forgot-left'>
                                    <div className='forgot-content'>
                                          <div className='col-12 text-forgot'>Forgot Password</div>
                                          <div className='col-12 form-group email-forgot'>
                                                <label>Email</label>
                                                <input
                                                      type='text'
                                                      className='form-control'
                                                      placeholder='Nhập vào email của bạn'
                                                      value={this.state.email}
                                                      onChange={(event) => this.handleOnChangeEmail(event)}
                                                ></input>
                                                <div className='col-12' style={{ color: "red" }}>
                                                      {this.state.errMessage}
                                                </div>
                                          </div>
                                          <div className='col-12'>
                                                <button
                                                      className='btn-forgot-password'
                                                      onClick={() => this.handleForgotPassword(this.state.email)}
                                                >
                                                      Gửi mật khẩu mới tới email của bạn
                                                </button>
                                          </div>
                                          <div className='col-12 wrap-return-login'>
                                                <img
                                                      src={ReturnLogin}
                                                      alt='return login icon'
                                                      className='icon-return-login'
                                                ></img>
                                                <span
                                                      className='return-login
                                                '
                                                      onClick={() => this.processReturnLogin()}
                                                >
                                                      Trở lại đăng nhập
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              <div className='forgot-right'>
                                    <img src={rightLogin} alt='img-right-forgot' className='img-right-forgot' />
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
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            navigate: (path) => dispatch(push(path)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
