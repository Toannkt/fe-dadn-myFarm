/** @format */

import actionTypes from "../actions/actionTypes";
const initialState = {};

const adminReducer = (state = initialState, action) => {
      switch (action.type) {
            // case actionTypes.FETCH_GENDER_START:
            //     console.log('check fetch gender start:', action);
            //     return {
            //         ...state,
            //     };

            // case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            //     console.log('get required doctor infor failed: ', action);
            //     return {
            //         ...state,
            //     };
            default:
                  return state;
      }
};

export default adminReducer;
