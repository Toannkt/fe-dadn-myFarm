/** @format */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import MyFarm from "./MyFarm/MyFarm";
import AboutUs from "./AboutUs/AboutUs";
import Contact from "./Contact/Contact";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import ChangeProfile from "./ChangeProfile/ChangeProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import System from "../routes/System";
import CustomScrollbars from "../components/CustomScrollbars";

class App extends Component {
      handlePersistorState = () => {
            const { persistor } = this.props;
            let { bootstrapped } = persistor.getState();
            if (bootstrapped) {
                  if (this.props.onBeforeLift) {
                        Promise.resolve(this.props.onBeforeLift())
                              .then(() => this.setState({ bootstrapped: true }))
                              .catch(() => this.setState({ bootstrapped: true }));
                  } else {
                        this.setState({ bootstrapped: true });
                  }
            }
      };

      componentDidMount() {
            this.handlePersistorState();
      }

      render() {
            return (
                  <Fragment>
                        <Router history={history}>
                              <div className='main-container'>
                                    {/* {this.props.isLoggedIn && <Header />} */}

                                    <div className='content-container'>
                                          <CustomScrollbars style={{ height: "100vh" }}>
                                                <Switch>
                                                      <Route path={path.HOME} exact component={Home} />
                                                      <Route path={path.MYFARM} exact component={MyFarm} />
                                                      <Route path={path.ABOUTUS} exact component={AboutUs} />

                                                      <Route path={path.CONTACT} exact component={Contact} />
                                                      <Route
                                                            path={path.LOGIN}
                                                            component={userIsNotAuthenticated(Login)}
                                                      />
                                                      <Route
                                                            path={path.FORGOTPASSWORD}
                                                            component={userIsNotAuthenticated(ForgotPassword)}
                                                      />
                                                      <Route
                                                            path={path.CHANGEPROFILE}
                                                            component={userIsAuthenticated(ChangeProfile)}
                                                      />
                                                      <Route
                                                            path={path.CHANGEPASSWORD}
                                                            component={userIsAuthenticated(ChangePassword)}
                                                      />
                                                      <Route
                                                            path={path.SYSTEM}
                                                            component={userIsAuthenticated(System)}
                                                      />
                                                      <Route
                                                            path={path.MYFARM}
                                                            component={userIsAuthenticated(MyFarm)}
                                                      />
                                                </Switch>
                                          </CustomScrollbars>
                                    </div>

                                    <ToastContainer
                                          // className="toast-container"
                                          // toastClassName="toast-item"
                                          // bodyClassName="toast-item-body"
                                          // autoClose={false}
                                          // hideProgressBar={true}
                                          // pauseOnHover={false}
                                          // pauseOnFocusLoss={true}
                                          // closeOnClick={false}
                                          // draggable={false}
                                          // closeButton={<CustomToastCloseButton />}
                                          position='bottom-right'
                                          autoClose={5000}
                                          hideProgressBar={false}
                                          newsOpTop={false}
                                          closeOnClick
                                          rtl={false}
                                          pauseOnFocusLoss
                                          draggable
                                          pauseOnHover
                                    />
                              </div>
                        </Router>
                  </Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            started: state.app.started,
            isLoggedIn: state.user.isLoggedIn,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
