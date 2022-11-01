import React from "react";
import axios from 'axios';

class ProjectFunctionClass extends React.Component {

    //function to add new project
    async addProject(name, deptID) {

        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('deptID', deptID);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/addproject',
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

    //function to get all the project based on given department id.
    async getProject(id) {

        var bodyFormData = new FormData();
        bodyFormData.append('id', id);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/getproject',
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

    //function to update the project details
    async updateProject(id, deptid, name) {

        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('deptid', deptid);
        bodyFormData.append('name', name);

        const result = await axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/updateproject',
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

    //function to delete the project
    async deleteProject(id) {

        var bodyFormData = new FormData();
        bodyFormData.append('id', id);

        const result = await axios({
            method: 'delete',
            url: 'http://127.0.0.1:5000/deleteproject',
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

const ProjectFunction = new ProjectFunctionClass;
export default ProjectFunction;