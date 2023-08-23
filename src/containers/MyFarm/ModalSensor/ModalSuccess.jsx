import { Modal } from 'antd'
import React from 'react'
import successIcon from "../../../../../assets/success_icon.png";

const ModalSuccess = ({isModalSuccessOpen, handleCancelSuccess}) => {
  return (
    <Modal
    open={isModalSuccessOpen}
    onCancel={handleCancelSuccess}
    closeIcon={false}
    width="450px"
    footer={[
      <button
        onClick={handleCancelSuccess}
        className="rounded-lg mx-3"
        style={{ backgroundColor: "#059669" }}
      >
        <p className="py-3 px-4 font-semibold text-white">Done</p>
      </button>,
    ]}
  >
    <div className="flex gap-5 pt-4">
      <img src={successIcon} alt="success" />
      <p style={{ fontSize: "14px", fontWeight: 550 }} className="mt-3">
        Successfully delete the item.
      </p>
    </div>
  </Modal>
  )
}

export default ModalSuccess