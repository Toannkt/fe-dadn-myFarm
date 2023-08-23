/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Fragment } from "react";
import { Switch } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import iconRemove from "../../assets/remove_icon.png";
import iconEdit from "../../assets/edit_icon.png";
import iconWatching from "../../assets/icon-watching.png";
import ModalEdit from "./ModalSensor/ModalEdit";
import ModalRemove from "./ModalSensor/ModalRemove";
import ModalStatistical from "./ModalSensor/ModalStatistical";
import {
      getLocationById,
      getSensorById,
      getDeviceById,
      getAllHistoryById,
      changeStatusDevice,
} from "../../services/userService";
import "./MyFarm.scss";

class MyFarm extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  isModalEditOpen: false,
                  isModalRemoveOpen: false,
                  isModalSuccessOpen: false,
                  isModalStatisticalOpen: false,
                  minLimited: "",
                  maxLimited: "",
                  nameEquipt: "",
                  idEquipt: "",
                  typeEquipt: "",
                  arrLocation: [],
                  arrSensor: [],
                  arrDevice: [],
                  selectedData: {},
                  statusDevice: "",
            };
      }
      getId = React.createRef(null);
      async componentDidMount() {
            await this.getAllLocationFromReact();
            await this.getAllSensorFromReact();
            await this.getAllDeviceFromReact();
      }
      handleCancelEdit = () => {
            this.setState({
                  isModalEditOpen: false,
            });
            this.getId.current = null;
      };
      hanleEdit = (sensor) => {
            console.log("isModalEditOpen: ", this.state.isModalEditOpen);
            this.setState({
                  isModalEditOpen: true,
                  selectedData: sensor,
            });
      };
      handleCancelRemove = () => {
            this.setState({
                  isModalRemoveOpen: false,
            });
            this.getId.current = null;
      };
      handleCancelSuccess = () => {
            this.setState({
                  isModalSuccessOpen: false,
            });
      };
      handleRemoveSensor = () => {
            // setSensorData((current) =>
            //   current.filter((sensor) => sensor.id !== getId.current)
            // );
            this.setState({
                  isModalRemoveOpen: false,
                  isModalSuccessOpen: true,
            });
            this.getId.current = null;
      };
      handleCancelStatistical = () => {
            this.setState({
                  isModalStatisticalOpen: false,
            });
            this.getId.current = null;
      };
      handleStatistical = async (idEquipt, type, name) => {
            let data = await getAllHistoryById(idEquipt, type);
            console.log("Statistical: ", data.data.length);
            if (data.data.length >= 10) {
                  let arr = [];
                  for (let i = 0; i < 10; i++) {
                        arr[i] = data.data[data.data.length - i - 1];
                  }
                  console.log("arr: ", arr);
                  this.setState({
                        isModalStatisticalOpen: true,
                        selectedData: arr,
                        nameEquipt: name,
                        idEquipt: idEquipt,
                        typeEquipt: type,
                  });
            } else {
                  this.setState({
                        isModalStatisticalOpen: true,
                        selectedData: data.data,
                        nameEquipt: name,
                        idEquipt: idEquipt,
                        typeEquipt: type,
                  });
            }
      };
      getAllLocationFromReact = async () => {
            let response = await getLocationById("All");
            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrLocation: response.dataLocation,
                        },
                        () => {},
                  );
            }
      };
      getOnlyLocationFromReact = async (id) => {
            let response = await getLocationById(id);
            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrLocation: response.dataLocation,
                        },
                        () => {},
                  );
            }
      };
      getAllSensorFromReact = async () => {
            let response = await getSensorById("All");
            console.log("response sensor: ", response);

            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrSensor: response.dataSensor,
                        },
                        () => {},
                  );
            }
      };
      getOnlySensorFromReact = async (id) => {
            let response = await getSensorById(id);
            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrSensor: response.dataSensor,
                        },
                        () => {},
                  );
            }
      };
      getAllDeviceFromReact = async () => {
            let response = await getDeviceById("All");
            console.log("response device: ", response);
            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrDevice: response.dataDevice,
                        },
                        () => {},
                  );
            }
      };
      getOnlyDeviceFromReact = async (id) => {
            let response = await getDeviceById(id);
            if (response && response.errCode === 0) {
                  this.setState(
                        {
                              arrDevice: response.dataDevice,
                        },
                        () => {},
                  );
            }
      };
      changeStatus = async (id, status) => {
            console.log("status: ", status);
            if (status === "On") status = "Off";
            else if (status === "Off") status = "On";
            await changeStatusDevice(id, status);
            await this.getAllDeviceFromReact();
      };

      notify = () => toast.warn("Cảnh báo vượt quá sự cho phép");
      render() {
            const {
                  isModalEditOpen,
                  selectedData,
                  isModalRemoveOpen,
                  isModalStatisticalOpen,
                  arrLocation,
                  arrSensor,
                  arrDevice,
                  nameEquipt,
                  idEquipt,
                  typeEquipt,
            } = this.state;
            console.log("arrDevice: ", arrDevice);
            return (
                  <Fragment>
                        <div className='background-image'>
                              <HomeHeader />
                              <div className='container-farm'>
                                    <div className='left'>
                                          <div className='title-location'>Vị trí</div>
                                          {arrLocation &&
                                                arrLocation.map((location) => {
                                                      return <div className='location'>{location.name}</div>;
                                                })}
                                          <button className='add-location'>Thêm vị trí</button>
                                    </div>
                                    <div className='right'>
                                          <div className='sensors'>
                                                <button className='add-sensor' onClick={this.notify}>
                                                      Cảm biến
                                                </button>
                                                <div className='table-sensor'>
                                                      <table id='customers'>
                                                            <tbody>
                                                                  <tr>
                                                                        <th>Id</th>
                                                                        <th>Tên cảm biến</th>
                                                                        <th>Ngày thêm</th>
                                                                        <th>Trạng thái</th>
                                                                        <th>Tối đa</th>
                                                                        <th>Tối thiểu</th>
                                                                        <th>Thống kê</th>
                                                                        <th>Chỉnh sửa</th>
                                                                        <th>Xóa</th>
                                                                  </tr>
                                                            </tbody>
                                                            <tbody>
                                                                  {arrSensor &&
                                                                        arrSensor.length > 0 &&
                                                                        arrSensor.map((sensor) => {
                                                                              return (
                                                                                    <tr
                                                                                          className={`sensor-${sensor.id}`}
                                                                                    >
                                                                                          <td>{sensor.id}</td>
                                                                                          <td>{sensor.name}</td>
                                                                                          <td>
                                                                                                {moment(
                                                                                                      sensor.createdAt,
                                                                                                ).format(
                                                                                                      "YYYY-MM-DD hh:mm:ss",
                                                                                                )}
                                                                                          </td>
                                                                                          <td>
                                                                                                <Switch
                                                                                                      defaultChecked={
                                                                                                            sensor.status ===
                                                                                                            "On"
                                                                                                                  ? true
                                                                                                                  : false
                                                                                                      }
                                                                                                      disabled
                                                                                                      checkedChildren='Bật'
                                                                                                      unCheckedChildren='Tắt'
                                                                                                />
                                                                                          </td>
                                                                                          <td>{sensor.minLimited}</td>
                                                                                          <td>{sensor.maxLimited}</td>
                                                                                          <td>
                                                                                                {" "}
                                                                                                <img
                                                                                                      src={iconWatching}
                                                                                                      alt='Watching icon'
                                                                                                      style={{
                                                                                                            width: "24px",
                                                                                                            height: "24px",
                                                                                                            cursor: "pointer",
                                                                                                      }}
                                                                                                      onClick={() =>
                                                                                                            this.handleStatistical(
                                                                                                                  sensor.id,
                                                                                                                  sensor.type,
                                                                                                                  sensor.name,
                                                                                                            )
                                                                                                      }
                                                                                                ></img>
                                                                                          </td>
                                                                                          <td>
                                                                                                <img
                                                                                                      src={iconEdit}
                                                                                                      alt='Edit icon'
                                                                                                      style={{
                                                                                                            width: "24px",
                                                                                                            height: "24px",
                                                                                                            cursor: "pointer",
                                                                                                      }}
                                                                                                      onClick={() =>
                                                                                                            this.hanleEdit(
                                                                                                                  sensor,
                                                                                                            )
                                                                                                      }
                                                                                                ></img>
                                                                                          </td>
                                                                                          <td>
                                                                                                <img
                                                                                                      src={iconRemove}
                                                                                                      alt='Remove icon'
                                                                                                      style={{
                                                                                                            width: "24px",
                                                                                                            height: "24px",
                                                                                                            cursor: "pointer",
                                                                                                      }}
                                                                                                      onClick={() =>
                                                                                                            this.setState(
                                                                                                                  {
                                                                                                                        isModalRemoveOpen: true,
                                                                                                                  },
                                                                                                            )
                                                                                                      }
                                                                                                ></img>
                                                                                          </td>

                                                                                          {/* <td>
                                                                              <div className='d-flex justify-content-around'>
                                                                                    <Switch
                                                                                          defaultChecked={
                                                                                                user.enabled === "true"
                                                                                                      ? true
                                                                                                      : false
                                                                                          }
                                                                                          onClick={() => {
                                                                                                this.handleChangeStatusUser(
                                                                                                      user.id,
                                                                                                      user.enabled,
                                                                                                );
                                                                                          }}
                                                                                    />
                                                                                    <button
                                                                                          onClick={() => {
                                                                                                this.handleEditUserModal(
                                                                                                      user,
                                                                                                );
                                                                                          }}
                                                                                    >
                                                                                          <i className='fas fa-pencil-alt'></i>
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                this.handleDeleteUser(
                                                                                                      user.id,
                                                                                                )
                                                                                          }
                                                                                    >
                                                                                          <i className='fas fa-trash-alt'></i>
                                                                                    </button>
                                                                              </div>
                                                                        </td> */}
                                                                                    </tr>
                                                                              );
                                                                        })}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                          <div className='devices'>
                                                <button className='add-device'>Thiết bị</button>
                                                <div className='table-device'>
                                                      <table id='customers'>
                                                            <tbody>
                                                                  <tr>
                                                                        <th>Id</th>
                                                                        <th>Tên cảm biến</th>
                                                                        <th>Ngày thêm</th>
                                                                        <th>Trạng thái</th>
                                                                        <th>Tự động</th>
                                                                        <th>Thống kê</th>
                                                                        <th>Xóa</th>
                                                                  </tr>
                                                            </tbody>
                                                            <tbody>
                                                                  {arrDevice &&
                                                                        arrDevice.length > 0 &&
                                                                        arrDevice.map((device) => {
                                                                              return (
                                                                                    <tr
                                                                                          className={`device-${device.id}`}
                                                                                    >
                                                                                          <td>{device.id}</td>
                                                                                          <td>{device.name}</td>
                                                                                          <td>
                                                                                                {moment(
                                                                                                      device.createdAt,
                                                                                                ).format(
                                                                                                      "YYYY-MM-DD hh:mm:ss",
                                                                                                )}
                                                                                          </td>
                                                                                          <td>
                                                                                                <Switch
                                                                                                      defaultChecked={
                                                                                                            device.status ===
                                                                                                            "On"
                                                                                                                  ? true
                                                                                                                  : false
                                                                                                      }
                                                                                                      checkedChildren='Bật'
                                                                                                      unCheckedChildren='Tắt'
                                                                                                      onClick={() =>
                                                                                                            this.changeStatus(
                                                                                                                  device.id,
                                                                                                                  device.status,
                                                                                                            )
                                                                                                      }
                                                                                                />
                                                                                          </td>
                                                                                          <td>
                                                                                                {/* <Switch
                                                                                                      defaultChecked={
                                                                                                            device.autoMode ===
                                                                                                            "On"
                                                                                                                  ? true
                                                                                                                  : false
                                                                                                      }
                                                                                                      checkedChildren='Bật'
                                                                                                      unCheckedChildren='Tắt'
                                                                                                      onClick={() =>
                                                                                                            this.changeStatus(
                                                                                                                  device.id,
                                                                                                                  device.status,
                                                                                                            )
                                                                                                      }
                                                                                                /> */}
                                                                                                {device.status === "On"
                                                                                                      ? "On"
                                                                                                      : "Off"}
                                                                                          </td>
                                                                                          <td>
                                                                                                <img
                                                                                                      src={iconWatching}
                                                                                                      alt='Watching icon'
                                                                                                      style={{
                                                                                                            width: "24px",
                                                                                                            height: "24px",
                                                                                                            cursor: "pointer",
                                                                                                      }}
                                                                                                      onClick={() =>
                                                                                                            this.handleStatistical(
                                                                                                                  device.id,
                                                                                                                  device.type,
                                                                                                                  device.name,
                                                                                                            )
                                                                                                      }
                                                                                                ></img>
                                                                                          </td>
                                                                                          <td>
                                                                                                <img
                                                                                                      src={iconRemove}
                                                                                                      alt='Remove icon'
                                                                                                      style={{
                                                                                                            width: "24px",
                                                                                                            height: "24px",
                                                                                                      }}
                                                                                                ></img>
                                                                                          </td>

                                                                                          {/* <td>
                                                                              <div className='d-flex justify-content-around'>
                                                                                    <Switch
                                                                                          defaultChecked={
                                                                                                user.enabled === "true"
                                                                                                      ? true
                                                                                                      : false
                                                                                          }
                                                                                          onClick={() => {
                                                                                                this.handleChangeStatusUser(
                                                                                                      user.id,
                                                                                                      user.enabled,
                                                                                                );
                                                                                          }}
                                                                                    />
                                                                                    <button
                                                                                          onClick={() => {
                                                                                                this.handleEditUserModal(
                                                                                                      user,
                                                                                                );
                                                                                          }}
                                                                                    >
                                                                                          <i className='fas fa-pencil-alt'></i>
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                this.handleDeleteUser(
                                                                                                      user.id,
                                                                                                )
                                                                                          }
                                                                                    >
                                                                                          <i className='fas fa-trash-alt'></i>
                                                                                    </button>
                                                                              </div>
                                                                        </td> */}
                                                                                    </tr>
                                                                              );
                                                                        })}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              {/* <ToastContainer /> */}
                              {isModalEditOpen && (
                                    <ModalEdit
                                          isModalEditOpen={isModalEditOpen}
                                          handleCancelEdit={this.handleCancelEdit}
                                          selectedData={selectedData}
                                          handleRender={this.getAllSensorFromReact}
                                    />
                              )}
                              {isModalRemoveOpen && (
                                    <ModalRemove
                                          isModalRemoveOpen={isModalRemoveOpen}
                                          handleCancelRemove={this.handleCancelRemove}
                                          handleRemove={this.handleRemoveSensor}
                                    />
                              )}
                              {isModalStatisticalOpen && (
                                    <ModalStatistical
                                          isModalStatisticalOpen={isModalStatisticalOpen}
                                          handleCancelStatistical={this.handleCancelStatistical}
                                          selectedData={selectedData}
                                          nameEquipt={nameEquipt}
                                          idEquipt={idEquipt}
                                          typeEquipt={typeEquipt}
                                    />
                              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyFarm);
