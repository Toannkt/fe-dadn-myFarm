/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import Footer from "../components/Footer/Footer";
import "./Home.scss";
import * as actions from "../store/actions";
class Home extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }
      render() {
            // this.props.processLogout();
            const { isLoggedIn, userInfo } = this.props;
            console.log("userInfo", userInfo);
            let linkToRedirect;
            if (isLoggedIn === true) {
                  if (userInfo.user.roleId === "ADMIN") {
                        linkToRedirect = "/system/manage-users";
                  } else if (userInfo.user.roleId === "CUSTOMER") {
                        linkToRedirect = "/my-farm";
                  }
            } else {
                  return (
                        <Fragment>
                              <div className='background-image'>
                                    <HomeHeader />
                                    <span className='introduce'>
                                          Chào mừng bạn đến với MyFarm, nơi chúng tôi sẽ giúp bạn quản lý nông trại của
                                          bạn hiệu quả. Cảm ơn đã tin tưởng dịch vụ. Nếu có bất cứ câu hỏi nào, đừng
                                          ngại liên hệ cho chúng tôi, chúng tôi sẽ tư vấn mọi thắc mắc của bạn.
                                    </span>
                                    <Footer />
                              </div>
                        </Fragment>
                  );
            }

            return <Redirect to={linkToRedirect} />;
      }
}

const mapStateToProps = (state) => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            processLogout: () => dispatch(actions.processLogout()),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
