/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import { getAllusers, editUserService } from "../../services/userService";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import "./ChangeProfile.scss";
class ChangeProfile extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  email: "",
                  firstName: "",
                  lastName: "",
                  phoneNumber: "",
                  address: "",
                  isSave: true,
                  user: {},
            };
      }
      async componentDidMount() {
            await this.getOnlyUserFromReact();
            this.setState({
                  email: this.state.user.email,
                  firstName: this.state.user.firstName,
                  lastName: this.state.user.lastName,
                  phoneNumber: this.state.user.phoneNumber,
                  address: this.state.user.address,
            });
      }
      getOnlyUserFromReact = async () => {
            let response = await getAllusers(this.props.userInfo.user.id);
            console.log(response);
            if (response && response.errCode === 0) {
                  this.setState({
                        user: response.users,
                  });
            }
      };
      handleOnChangeInput = (e, type) => {
            let copyState = { ...this.state };
            copyState[type] = e.target.value;
            this.setState({
                  ...copyState,
            });
      };
      toggleChange = () => {
            if (this.state.isSave === false) {
                  let user = {
                        id: this.props.userInfo.user.id,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        address: this.state.address,
                        phoneNumber: this.state.phoneNumber,
                  };
                  this.handleEditUser(user);
            }
            this.setState({
                  isSave: !this.state.isSave,
            });
      };
      handleEditUser = async (user) => {
            try {
                  console.log("test change profile");
                  let res = await editUserService(user);
                  if (res && res.errCode === 0) {
                        alert("Thông tin người dùng đã được cập nhật!");
                  } else {
                        console.log("Missing responese from edit user");
                  }
            } catch (e) {
                  console.log(e);
            }
      };
      render() {
            console.log("this.props.user: ", this.state.lastName);
            const { address, email, firstName, lastName, phoneNumber } = this.state;
            const isSave = this.state.isSave;
            return (
                  <Fragment>
                        <div className='background-image'>
                              <HomeHeader />
                              <div className='change-profile'>
                                    <div className='col-12 form-group'>
                                          <label>Email</label>
                                          <div className='custom-form-change-profile'>
                                                <input
                                                      style={{ color: "#8e8e8e" }}
                                                      type='text'
                                                      className={`form-control email`}
                                                      placeholder='email của bạn'
                                                      value={email}
                                                      name='email'
                                                      disabled={true}
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='col-12 form-group'>
                                          <label>Số điện thoại</label>
                                          <div className='custom-form-change-profile'>
                                                <input
                                                      type='text'
                                                      className={`form-control phoneNumber`}
                                                      placeholder='Số điện thoại của bạn'
                                                      value={phoneNumber}
                                                      name='phoneNumber'
                                                      disabled={isSave}
                                                      onChange={(event) =>
                                                            this.handleOnChangeInput(event, "phoneNumber")
                                                      }
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='col-12 form-group'>
                                          <label>Địa chỉ</label>
                                          <div className='custom-form-change-profile'>
                                                <input
                                                      type='text'
                                                      className={`form-control address`}
                                                      placeholder='Địa chỉ của bạn'
                                                      value={address}
                                                      name='address'
                                                      disabled={isSave}
                                                      onChange={(event) => this.handleOnChangeInput(event, "address")}
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='col-12 form-group'>
                                          <label>Tên của bạn</label>
                                          <div className='custom-form-change-profile'>
                                                <input
                                                      type='text'
                                                      className={`form-control firstName`}
                                                      placeholder='Tên của bạn'
                                                      value={firstName}
                                                      name='firstName'
                                                      disabled={isSave}
                                                      onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='col-12 form-group'>
                                          <label>Họ của bạn</label>
                                          <div className='custom-form-change-profile'>
                                                <input
                                                      type='text'
                                                      className={`form-control lastName`}
                                                      placeholder='Họ của bạn'
                                                      value={lastName}
                                                      name='lastName'
                                                      disabled={isSave}
                                                      onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='col-12 btn-change'>
                                          {this.state.isSave === false ? (
                                                <button
                                                      className='btn-save-profile'
                                                      onClick={() => this.toggleChange()}
                                                >
                                                      Lưu
                                                </button>
                                          ) : (
                                                <button
                                                      className='btn-change-profile'
                                                      onClick={() => this.toggleChange()}
                                                >
                                                      Thay đổi
                                                </button>
                                          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfile);
