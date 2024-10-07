/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Generate auth code
*
* staffGenerateCodeBody StaffGenerateCodeBody  (optional)
* returns inline_response_200_2
* */
const generateAuthCode = ({ staffGenerateCodeBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        staffGenerateCodeBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve staff details
*
* employeeUnderscorenumber String 
* returns inline_response_200
* */
const getStaffDetails = ({ employeeUnderscorenumber }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        employeeUnderscorenumber,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Register a new staff member
*
* surname String 
* otherUnderscorenames String 
* dob date 
* idUnderscorephoto File  (optional)
* returns Staff
* */
const registerStaff = ({ surname, otherUnderscorenames, dob, idUnderscorephoto }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        surname,
        otherUnderscorenames,
        dob,
        idUnderscorephoto,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update staff member information
*
* employeeUnderscorenumber String  (optional)
* dob date  (optional)
* photo File  (optional)
* returns Staff
* */
const updateStaff = ({ employeeUnderscorenumber, dob, photo }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        employeeUnderscorenumber,
        dob,
        photo,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* User login
*
* authLoginBody AuthLoginBody  (optional)
* returns inline_response_200_1
* */
const userLogin = ({ authLoginBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authLoginBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* User registration
*
* authRegisterBody AuthRegisterBody  (optional)
* no response value expected for this operation
* */
const userRegistration = ({ authRegisterBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authRegisterBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  generateAuthCode,
  getStaffDetails,
  registerStaff,
  updateStaff,
  userLogin,
  userRegistration,
};
