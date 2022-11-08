import React, { useEffect, useState } from "react";
import useHistory, { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux"
import LoginFunction from '../../Functions/User/User'
import { Helmet } from 'react-helmet'
import '../../CSS/LOGIN/Login.css'
import { userRemoveData, userSetData } from "../../Redux/User/userAction";

function SingIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        designation: '',
        email: '',
        password: '',
        confirmpassword: '',
        loading: false,
        message: '',
    });

    const { name, designation, email, password, confirmpassword, loading, message } = state;
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleLogin = (event) => {
        navigate('/login')
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        setState({ ...state, message: 'Sign in...', loading: true });
        const { name, designation, email, password, confirmpassword } = state
        try {
            if (name.length == 0) {
                setState({ ...state, message: 'Name cannot be empty', loading: true });
                return
            }
            if (designation.length == 0) {
                setState({ ...state, message: 'Designation cannot be empty', loading: true });
                return
            }
            if (email.length == 0) {
                setState({ ...state, message: 'Email cannot be empty', loading: true });
                return
            }
            if (password !== confirmpassword) {
                setState({ ...state, message: 'Password did not match', loading: true });
                return
            }
            if (password.length == 0) {
                setState({ ...state, message: 'Password cannot be empty', loading: true });
                return
            }
            LoginFunction.createUser(name, designation, email, password, confirmpassword).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    navigate('/login');
                } else {
                    setState({ ...state, message: response.data.data.message, loading: false })
                }
            }).catch(e => {
                const msg = e.toString();
                setState({ ...state, message: msg, loading: false })
            })
        } catch (e) {
            const msg = e.toString();
            setState({ ...state, message: msg, loading: false })
        }
    };



    return (
        <>
            <Helmet>
                <title>Ticket System - Signup</title>
            </Helmet>

            <div className="login-background">
                <div className="container-fluid">
                    <div className="row full-width justify-content-center">
                        <div className="login-row-login login-contents col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4">
                            <h1>Ticket System - Signup page</h1>
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                <div className="form-control">
                                    <input className="form-control" type="text" placeholder="Name" size={40}
                                        value={name}
                                        name="name" required="required"
                                        onChange={e => {
                                            handleChange(e)
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="form-control">
                                    <input className="form-control" type="text" placeholder="Designation" size={40}
                                        value={designation}
                                        name="designation" required="required"
                                        onChange={e => {
                                            handleChange(e)
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="form-control">
                                    <input className="form-control" type="email" placeholder="Email (user@example.com)" size={40}
                                        value={email}
                                        name="email" required="required" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$"
                                        onChange={e => {
                                            handleChange(e)
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="form-control">
                                    <input className="form-control" type="password" placeholder="Password" size={40}
                                        value={password}
                                        name="password" required="required"
                                        onChange={e => {
                                            handleChange(e)
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="form-control">
                                    <input className="form-control" type="password" placeholder="Confirm Password" size={40}
                                        value={confirmpassword}
                                        name="confirmpassword" required="required"
                                        onChange={e => {
                                            handleChange(e)
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
                                                className={"btn-danger full-width float-left"}>SIGN IN</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={handleLogin} noValidate autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Button type="submit" variant="primary" size="md"
                                            className={"btn-danger full-width float-left"}>GO TO LOGIN</Button>
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

export default SingIn;