import React from "react";
import axios from 'axios';

class TicketFunctionClass extends React.Component {

    //function to add new ticket
    async addTicket(projectId, userId, title, body) {

        var bodyFormData = new FormData();
        bodyFormData.append('projectId', projectId);
        bodyFormData.append('userId', userId);
        bodyFormData.append('title', title);
        bodyFormData.append('body', body);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/addticket',
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

    //function to get all the ticket for given project
    async getTicket(projectId) {

        var bodyFormData = new FormData();
        bodyFormData.append('projectid', projectId);

        const result = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/getticketforproject',
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

    //function to get all the ticket for given project
    async getAllUser() {

        const result = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/getallusers',
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

    //function to update the ticket
    async updateTicket(projectId, userId, ticketId, title, body, status) {

        var bodyFormData = new FormData();
        bodyFormData.append('projectId', projectId);
        bodyFormData.append('userId', userId);
        bodyFormData.append('ticketId', ticketId);
        bodyFormData.append('title', title);
        bodyFormData.append('body', body);
        bodyFormData.append('status', status);

        const result = await axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/updateticket',
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
    async deleteTicket(ticketId) {

        var bodyFormData = new FormData();
        bodyFormData.append('ticketId', ticketId);

        const result = await axios({
            method: 'delete',
            url: 'http://127.0.0.1:5000/deleteticket',
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

const TicketFunction = new TicketFunctionClass;
export default TicketFunction;