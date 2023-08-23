/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageUser from "../containers/System/ManageUser";
import MyFarm from "../containers/MyFarm/MyFarm";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
class System extends Component {
      render() {
            const { systemMenuPath /*isLoggedIn*/ } = this.props;
            return (
                  <React.Fragment>
                        {this.props.isLoggedIn && <HeaderAdmin />}
                        <div className='system-container'>
                              <div className='system-list'>
                                    <Switch>
                                          {this.props.userInfo.user.roleId === "ADMIN" && (
                                                <Route path='/system/manage-users' component={ManageUser} />
                                          )}
                                          {this.props.userInfo.user.roleId === "CUSTOMER" && (
                                                <Route path='/my-farm' component={MyFarm} />
                                          )}

                                          <Route
                                                component={() => {
                                                      return <Redirect to={systemMenuPath} />;
                                                }}
                                          />
                                    </Switch>
                              </div>
                        </div>
                  </React.Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            systemMenuPath: state.app.systemMenuPath,
            isLoggedIn: state.user.isLoggedIn,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
