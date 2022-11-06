import React, { useEffect, useState } from "react";
import useHistory, { useNavigate, useLocation } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet'
import { FaInfoCircle } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import '../../CSS/Home/Home.css'
import TicketFunction from "../../Functions/Ticket/Ticket";

function AddTicket() {
    const { state } = useLocation();
    const projectId = state
    console.log(projectId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tempuserOptions, settempUserOptions] = useState([]);
    const [loading, setLoading] = useState(true)

    const [ticketData, setState] = useState({
        name: '',
        body: '',
        userInfo: '',
        message: '',
    });

    const { name, body, userInfo, message } = ticketData;
    const handleChangeValue = async (e) => {
        const { name, value } = e.target;
        setState({ ...ticketData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        setState({ ...ticketData, message: 'adding ...' });
        const { name, body, userInfo } = ticketData;
        try {
            TicketFunction.addTicket(projectId.id, userInfo, name, body).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    navigate('/ticket', { state: { id: projectId.id } });
                } else {
                    setState({ ...ticketData, message: 'Failed to add' });
                }
            }).catch(e => {
                const msg = e.toString();
                setState({ ...ticketData, message: msg });
            })
        } catch (e) {
            const msg = e.toString();
            setState({ ...ticketData, message: msg });
        }
    };

    useEffect(() => {
        TicketFunction.getAllUser().then((response) => {
            let tempUserOptions = []
            if (response.data && response.data.data && response.data.data.status) {
                response.data.data.data.map((users, key) => {
                    const label = "[" + String(users.id) + "]" + "[" + String(users.name) + "]"
                    tempUserOptions.push({ label: label, value: parseInt(users.id) })
                })
                settempUserOptions(tempUserOptions);
            }
        }).catch((e) => {

        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const logout = () => {
        navigate('/login');
    }


    return (
        <>
            <Helmet>
                <title>Ticket System - Add Ticket</title>
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
                                <div><h1>Add Ticket</h1></div>
                                <div className="form-control">
                                    <input className="form-control" type="text" placeholder="Name of Ticket" size={40}
                                        value={name}
                                        name="name" required="required"
                                        onChange={e => {
                                            handleChangeValue(e)
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="form-control">
                                    <input className="form-control" type="text" placeholder="Body of the ticket" size={40}
                                        value={body}
                                        name="body" required="required"
                                        onChange={e => {
                                            handleChangeValue(e)
                                        }}
                                    />
                                </div>

                                <br />
                                <div className="form-control">
                                    <select className="form-control" placeholder="Select user" name="userInfo"
                                        onChange={(e) => handleChangeValue(e)}>
                                        <option value="">{`${loading ? 'loading data' : 'please select from below users'}`}</option>
                                        {!loading && tempuserOptions.map((item, id) => (
                                            <option key={id} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
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
                                                className={"btn-danger full-width float-left"}>Add Ticket</Button>
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

export default AddTicket;