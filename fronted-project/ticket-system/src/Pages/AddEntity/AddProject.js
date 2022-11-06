import React, { useEffect, useState } from "react";
import useHistory, { useNavigate, useLocation } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet'
import { FaInfoCircle } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import '../../CSS/Home/Home.css'
import ProjectFunction from "../../Functions/Project/Project";

function AddProject() {
    const { state } = useLocation();
    const deptId = state
    console.log(deptId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [projectdata, setState] = useState({
        name: '',
        message: '',
    });

    const { name, message } = projectdata;
    const handleChangeValue = async (e) => {
        const { name, value } = e.target;
        setState({ ...projectdata, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        setState({ ...projectdata, message: 'adding ...' });
        const { name } = projectdata
        try {
            ProjectFunction.addProject(name, deptId.id).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    navigate('/projects', { state: { id: deptId.id } });
                } else {
                    setState({ ...projectdata, message: 'Failed to add' });
                }
            }).catch(e => {
                const msg = e.toString();
                setState({ ...projectdata, message: msg });
            })
        } catch (e) {
            const msg = e.toString();
            setState({ ...projectdata, message: msg });
        }
    };

    const logout = () => {
        navigate('/login');
    }



    return (
        <>
            <Helmet>
                <title>Ticket System - Add Project</title>
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
                                <div><h1>Add Project</h1></div>
                                <div className="form-control">
                                    <input className="form-control" type="text" placeholder="Name of Project" size={40}
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
                                                className={"btn-danger full-width float-left"}>Add Project</Button>
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

export default AddProject;