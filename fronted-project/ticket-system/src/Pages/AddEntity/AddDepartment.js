import React, { useEffect, useState } from "react";
import useHistory, { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet'
import { FaInfoCircle } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import '../../CSS/Home/Home.css'
import DepartmentFunction from "../../Functions/Department/Department";

function AddDepartment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        message: '',
    });

    const { name, message } = state;
    const handleChangeValue = async (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const logout = () => {
        navigate('/login');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        setState({ ...state, message: 'adding ...' });
        const { name } = state
        try {
            DepartmentFunction.addDepartment(name).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    navigate('/home');
                } else {
                    setState({ ...state, message: 'Failed to add' });
                }
            }).catch(e => {
                const msg = e.toString();
                setState({ ...state, message: msg });
            })
        } catch (e) {
            const msg = e.toString();
            setState({ ...state, message: msg });
        }
    };



    return (
        <>
            <Helmet>
                <title>Ticket System - Add Department</title>
            </Helmet>

            <div className="login-background">
                <div className="button-css">
                    <button type="button" className="button_example"
                        onClick={() => logout()}>Logout</button>
                </div>
                <div className="container-fluid">
                    <div className="row full-width justify-content-center">
                        <div className="login-row-login login-contents col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4">
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                <div><h1>Add Department</h1></div>
                                <div className="form-control">
                                    <input className="form-control" type="text" placeholder="Name of Department" size={40}
                                        value={name}
                                        name="name" required="required"
                                        onChange={e => {
                                            handleChangeValue(e)
                                        }}
                                    />
                                </div>

                                <br />

                                <div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div>{message}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Button type="submit" variant="primary" size="md"
                                                className={"btn-danger full-width float-left"}>Add Department</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDepartment;