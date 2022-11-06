import React from "react";
import axios from 'axios';

class DepartmentFunctionClass extends React.Component {

    //function to addd new department to the organizaiton
    async addDepartment(name) {

        var bodyFormData = new FormData();
        bodyFormData.append('name', name);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/adddepartment',
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

    //function to get all the departments
    async getAllDepartment() {

        const result = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/getalldepartment',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
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

    //function to update the department name
    async updateDepartment(id, name) {

        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('name', name);

        const result = await axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/updatedepartment',
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

    //function to delete the department
    async deleteDepartment(id) {

        var bodyFormData = new FormData();
        bodyFormData.append('id', id);

        const result = await axios({
            method: 'delete',
            url: 'http://127.0.0.1:5000/deletedepartment',
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

const DepartmentFunction = new DepartmentFunctionClass;
export default DepartmentFunction;