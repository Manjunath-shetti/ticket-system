import React, { useEffect, useState } from "react";
import useHistory, { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux"
import LoginFunction from '../../Functions/User/User'
import { Helmet } from 'react-helmet'
import '../../CSS/LOGIN/Login.css'
import { userRemoveData, userSetData } from "../../Redux/User/userAction";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(userRemoveData());

    const [state, setState] = useState({
        email: '',
        password: '',
        loading: false,
        message: '',
    });

    const { email, password, loading, message } = state;
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSignup = (event) => {
        navigate('/signup')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        setState({ ...state, message: 'Loggin in...', loading: true });
        const { email, password } = state
        try {
            LoginFunction.loginUser(email, password).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    dispatch(userSetData(response.data.data))
                    navigate('/home');
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
                <title>Ticket System - Login</title>
            </Helmet>

            <div className="login-background">
                <div className="container-fluid">
                    <div className="row full-width justify-content-center">
                        <div className="login-row-login login-contents col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4">
                            <h1>Ticket System - Login page</h1>
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
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

                                <div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div>{message}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Button type="submit" variant="primary" size="lg">LOGIN</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={handleSignup} noValidate autoComplete="off">
                                <div className="row">
                                    <div>
                                        <Button type="submit" variant="primary" size="lg"
                                            className={"btn-danger full-width float-left"}>SIGN UP</Button>
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

export default Login;