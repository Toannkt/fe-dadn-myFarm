/** @format */

import { Modal } from "antd";
import React, { useState } from "react";
import { getAllHistoryById } from "../../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import Example from "../Chart/Chart";
import "./ModalStatistical.scss";
import moment from "moment";
import { useEffect } from "react";
const notifyV1 = () => toast.warn(`Cảnh báo nhiệt độ vượt quá sự cho phép`);
const notifyV2 = () => toast.warn(`Cảnh báo độ ẩm đất vượt quá sự cho phép`);
const notifyV3 = () => toast.warn(`Cảnh báo độ ẩm không khí vượt quá sự cho phép`);
const notifyV4 = () => toast.warn(`Cảnh báo ánh sáng vượt quá sự cho phép`);

const CheckValueLimitted = (typeEquipt, value, minLimited, maxLimited) => {
      // Cảm biến nhiệt độ
      if (typeEquipt === "v1") {
            if (value > maxLimited || value < minLimited) {
                  notifyV1();
            }
      }
      //Cảm biến độ ẩm đất
      if (typeEquipt === "v2") {
            if (value > maxLimited || value < minLimited) {
                  notifyV2("độ ẩm đất");
            }
      }
      // Cảm biến độ ẩm không khí
      if (typeEquipt === "v3") {
            if (value > maxLimited || value < minLimited) {
                  notifyV3();
            }
      }
      //Cảm biến ánh sáng
      if (typeEquipt === "v4") {
            if (value > maxLimited || value < minLimited) {
                  notifyV4();
            }
      }
};
const ModalStatistical = ({
      isModalStatisticalOpen,
      handleCancelStatistical,
      selectedData,
      nameEquipt,
      idEquipt,
      typeEquipt,
      minValue,
      maxValue,
}) => {
      const [dataArr, setData] = useState(selectedData);
      let timeDelay;
      if (typeEquipt === "b1" || typeEquipt === "b2") {
            timeDelay = 2000;
      } else {
            timeDelay = 30000;
      }
      useEffect(() => {
            setInterval(async () => {
                  let data = await getAllHistoryById(idEquipt, typeEquipt);
                  CheckValueLimitted(typeEquipt, parseFloat(dataArr[0].value), minValue, maxValue);
                  // console.log(typeEquipt, parseFloat(dataArr[0].value), minValue, maxValue);
                  if (data.data.length >= 10) {
                        let arr = [];
                        for (let i = 0; i < 10; i++) {
                              arr[i] = data.data[data.data.length - i - 1];
                        }
                        setData(arr);
                  } else {
                        setData(data.data);
                  }
            }, timeDelay);
      }, []);
      return (
            <Modal open={isModalStatisticalOpen} onCancel={handleCancelStatistical} closeIcon={false} footer={null}>
                  <div className='history-sensors'>
                        <div
                              className=''
                              style={{
                                    backgroundColor: "#04aa6d",
                                    border: "none",
                                    color: "white",
                                    margin: "16px",
                                    padding: "8px",
                                    fontSize: "16px",
                                    borderRadius: "8px",
                                    textAlign: "center",
                              }}
                        >
                              {`Lịch sử: ${nameEquipt}`}
                        </div>
                        <div className='table-sensor'>
                              <table id='customers'>
                                    <tbody>
                                          <tr>
                                                <th>Id</th>
                                                <th>Thời gian</th>
                                                <th>Giá trị</th>
                                          </tr>
                                    </tbody>
                                    <tbody>
                                          {dataArr &&
                                                dataArr.map((data) => {
                                                      return (
                                                            <tr className={`sensor-${data.id}`}>
                                                                  <td>{data.id}</td>
                                                                  <td>
                                                                        {moment(data.updatedAt).format(
                                                                              "YYYY-MM-DD hh:mm:ss",
                                                                        )}
                                                                  </td>
                                                                  {data.type === "b1" || data.type === "b2" ? (
                                                                        <td>
                                                                              {data.value === "0" || data.value === "2"
                                                                                    ? "On"
                                                                                    : "Off"}
                                                                        </td>
                                                                  ) : (
                                                                        <td>{data.value}</td>
                                                                  )}
                                                            </tr>
                                                      );
                                                })}
                                    </tbody>
                              </table>
                        </div>
                  </div>
                  <div className='dash-board-sensor'>
                        <div
                              className=''
                              style={{
                                    backgroundColor: "#04aa6d",
                                    border: "none",
                                    color: "white",
                                    margin: "16px",
                                    padding: "8px",
                                    fontSize: "16px",
                                    borderRadius: "8px",
                                    textAlign: "center",
                              }}
                        >
                              Đồ thị hiển thị lịch sử
                        </div>
                        <Example data={dataArr} />
                  </div>
            </Modal>
      );
};

export default ModalStatistical;
