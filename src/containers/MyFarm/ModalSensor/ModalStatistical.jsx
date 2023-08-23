/** @format */

import { Modal } from "antd";
import React, { useState } from "react";
import { getAllHistoryById } from "../../../services/userService";
import Example from "../Chart/Chart";
import "./ModalStatistical.scss";
import moment from "moment";
const ModalStatistical = ({
      isModalStatisticalOpen,
      handleCancelStatistical,
      selectedData,
      nameEquipt,
      idEquipt,
      typeEquipt,
}) => {
      const [dataArr, setData] = useState(selectedData);
      console.log(idEquipt, typeEquipt);
      let timeDelay;
      if (typeEquipt === "b1" || typeEquipt === "b2") {
            timeDelay = 2000;
      } else {
            timeDelay = 30000;
      }
      setInterval(async () => {
            let data = await getAllHistoryById(idEquipt, typeEquipt);
            console.log("Statistical: ", data.data.length);
            if (data.data.length >= 10) {
                  let arr = [];
                  for (let i = 0; i < 10; i++) {
                        arr[i] = data.data[data.data.length - i - 1];
                  }
                  console.log("arr: ", arr);
                  setData(arr);
            } else {
                  setData(data.data);
            }
            console.log("arr: ", data);
      }, timeDelay);
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
