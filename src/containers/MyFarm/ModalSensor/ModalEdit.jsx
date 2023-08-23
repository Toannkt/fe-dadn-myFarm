/** @format */

import { Modal } from "antd";
import React, { useState } from "react";
import { changeSensorById } from "../../../services/userService";

const ModalEdit = ({ isModalEditOpen, handleCancelEdit, selectedData, handleRender }) => {
      const [isEdit, setIsEdit] = useState(false);
      const [minEdit, setMinEdit] = useState(0);
      const [maxEdit, setMaxEdit] = useState(0);
      // if (isModalEditOpen === true) {
      //       setIsModal(true);
      // }
      const changeLimited = async (data) => {
            await changeSensorById(data);
            handleCancelEdit();
            handleRender();
      };

      return (
            <Modal
                  open={isModalEditOpen}
                  onCancel={handleCancelEdit}
                  closeIcon={false}
                  width='300px'
                  footer={null}
                  style={{ top: 200 }}
            >
                  <table
                        className='modal-edit-sensor'
                        style={{ fontSize: "32px", margin: "auto", width: "250px", textAlign: "center" }}
                  >
                        <tr>
                              <td>Tối đa</td>
                              <td>Tối thiểu</td>
                        </tr>
                        <tr>
                              <td>
                                    {isEdit ? (
                                          <input
                                                name='min'
                                                value={minEdit}
                                                onChange={(e) => setMinEdit(e.target.value)}
                                                style={{ width: "54.59px", textAlign: "center", borderRadius: "8px" }}
                                          />
                                    ) : (
                                          <p className='text-center'>{selectedData.minLimited}</p>
                                    )}
                              </td>
                              <td>
                                    {isEdit ? (
                                          <input
                                                name='max'
                                                value={maxEdit}
                                                onChange={(e) => setMaxEdit(e.target.value)}
                                                style={{ width: "59.7px", textAlign: "center", borderRadius: "8px" }}
                                          />
                                    ) : (
                                          <p className='text-center'>{selectedData.maxLimited}</p>
                                    )}
                              </td>
                        </tr>
                  </table>
                  {isEdit ? (
                        <button
                              // onClick={handleSave}
                              style={{
                                    backgroundColor: "#FF2E00",
                                    marginLeft: "45px",
                                    width: "167px",
                                    height: "60px",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "white",
                              }}
                              className='my-3'
                        >
                              <p
                                    className='font-semibold'
                                    style={{ fontSize: "32px" }}
                                    onClick={() =>
                                          changeLimited({
                                                minLimited: minEdit,
                                                maxLimited: maxEdit,
                                                idSensor: selectedData.id,
                                          })
                                    }
                              >
                                    Lưu
                              </p>
                        </button>
                  ) : (
                        <button
                              onClick={() => {
                                    setIsEdit(true);
                                    setMaxEdit(selectedData.maxLimited);
                                    setMinEdit(selectedData.minLimited);
                              }}
                              style={{
                                    backgroundColor: "#FFC700",
                                    marginLeft: "45px",
                                    width: "167px",
                                    height: "60px",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "white",
                              }}
                              className='my-3'
                        >
                              <p className='font-semibold' style={{ fontSize: "32px" }}>
                                    Thay đổi
                              </p>
                        </button>
                  )}
            </Modal>
      );
};

export default ModalEdit;
