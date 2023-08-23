/** @format */

// import { get } from "lodash";
// import { escapeRegExp } from 'lodash';
import { toast } from "react-toastify";
// import {} from '../../services/userService';
import actionTypes from "./actionTypes";

//GET GENDER
// export const fetchGenderStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             setTimeout(async () => {
//                 let resGenders = await getAllCodeService('GENDER');
//                 //Genders
//                 if (resGenders && resGenders.errCode === 0) {
//                     dispatch(fetchGenderSuccess(resGenders.data));
//                 } else {
//                     dispatch(fetchGenderFailed());
//                 }
//             }, 2000);
//         } catch (e) {
//             dispatch(fetchGenderFailed());
//             console.log('message: ', e);
//         }
//     };
// };

// export const fetchGenderSuccess = (dataGender) => ({
//     type: actionTypes.FETCH_GENDER_SUCCESS,
//     dataGender: dataGender,
// });

// export const fetchGenderFailed = () => ({
//     type: actionTypes.FETCH_GENDER_FAILED,
// });
