import React from "react";
import axios from 'axios';

class UserFunctionClass extends React.Component {

    //create user backend call service function
    async createUser(name, designation, email, password) {

        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('designation', designation);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/createuser',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData,
        }).then(response => {
            if (response.status === 200) {
                return { status: true, data: response, statusCode: response.status }
            } else {
                return { status: false, data: response.error, statusCode: response.status }
            }
        }).catch(err => {
            let statusCode = 500;
            let statusMsg = 'CONNECTION REFUSED';
            if (err.response) {
                statusMsg = err.response.data.error;
                statusCode = err.response.status;
            }
            return { status: false, message: statusMsg, statusCode: statusCode }
        })
        return result;
    }

    //login user backend call service function
    async loginUser(email, password) {

        var bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/login',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData,
        }).then(response => {
            if (response.status === 200) {
                return { status: true, data: response, statusCode: response.status }
            } else {
                return { status: false, data: response.error, statusCode: response.status }
            }
        }).catch(err => {
            let statusCode = 500;
            let statusMsg = 'CONNECTION REFUSED';
            if (err.response) {
                statusMsg = err.response.data.error;
                statusCode = err.response.status;
            }
            return { status: false, message: statusMsg, statusCode: statusCode }
        })
        return result;
    }

    //update user backend call service function
    async updateUser(name, email, designation) {

        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('email', email);
        bodyFormData.append('designation', designation);

        const result = await axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/updateuser',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData,
        }).then(response => {
            if (response.status === 200) {
                return { status: true, data: response, statusCode: response.status }
            } else {
                return { status: false, data: response.error, statusCode: response.status }
            }
        }).catch(err => {
            let statusCode = 500;
            let statusMsg = 'CONNECTION REFUSED';
            if (err.response) {
                statusMsg = err.response.data.error;
                statusCode = err.response.status;
            }
            return { status: false, message: statusMsg, statusCode: statusCode }
        })
        return result;
    }

    //delete user backend call service function
    async deleteUser(email) {

        var bodyFormData = new FormData();
        bodyFormData.append('email', email);

        const result = await axios({
            method: 'delete',
            url: 'http://127.0.0.1:5000/deleteuser',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData,
        }).then(response => {
            if (response.status === 200) {
                return { status: true, data: response, statusCode: response.status }
            } else {
                return { status: false, data: response.error, statusCode: response.status }
            }
        }).catch(err => {
            let statusCode = 500;
            let statusMsg = 'CONNECTION REFUSED';
            if (err.response) {
                statusMsg = err.response.data.error;
                statusCode = err.response.status;
            }
            return { status: false, message: statusMsg, statusCode: statusCode }
        })
        return result;
    }

}

const UserFunction = new UserFunctionClass;
export default UserFunction;