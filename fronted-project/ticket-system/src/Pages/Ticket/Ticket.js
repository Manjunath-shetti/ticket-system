import React, { useEffect, useState } from "react";
import { useHistory, useNavigate, useLocation } from "react-router-dom"
import { Button } from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux"
import TicketFunction from '../../Functions/Ticket/Ticket'
import { FaCog, FaInfoCircle } from 'react-icons/fa'
import './../../CSS/Home/Home.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Helmet } from "react-helmet";
function Ticket() {
    const { state } = useLocation();
    const projectData = state
    const userData = useSelector(state => state.user);
    const navigate = useNavigate();
    const [deleteReponse, setDeleteResponse] = useState(null)

    const [tickets, setTickets] = useState(null);
    const [loading, setLoading] = useState(true);

    const deleteTicket = (data) => {
        TicketFunction.deleteTicket(data.id).then((response) => {
            if (response.data && response.data.data && response.data.data.status) {
                setDeleteResponse(response.data.data.data)
            }
        }).catch((e) => {
            console.error(e.toString())
        })
    }

    const logout = () => {
        navigate('/login');
    }

    useEffect(() => {
        if (userData.status) {
            TicketFunction.getTicket(projectData.id).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    setTickets(response.data.data.data)
                }
            }).catch((e) => {
                console.error(e.toString())
            }).finally(() => {
                setLoading(false);
            });
        } else {
            navigate('/login');
        }
    }, [deleteReponse]);

    const handleOnAdd = () => {
        navigate('/addticket', { state: { id: projectData.id } });
    }

    return (
        <>
            <Helmet>
                <title>Ticket System - Tickets</title>
            </Helmet>

            <div className="box">
                <div className="button-css">
                    <button type="button" className="button_example"
                        onClick={() => logout()}>Logout</button>
                </div>
                <h1>Ticket System - Ticket Page</h1>
                <div className="button-css">
                    <button type="button" class="btn btn-success"
                        onClick={() => handleOnAdd()}>Add New Ticket</button>
                </div>
                {loading ?
                    <div>
                        <div>
                            <FaCog className="loader loader-css" />
                        </div>
                    </div>
                    :
                    <div>
                        <div className="table-center">
                            <div>
                                <div>
                                    <div>
                                        <h6>
                                            <div>Ticket details
                                                <Tippy
                                                    theme="light"
                                                    placement="right"
                                                    content={<span>This is Ticket data</span>}
                                                >
                                                    <span>
                                                        <FaInfoCircle size="1em" className="overview-info-icon" />
                                                    </span>
                                                </Tippy>
                                            </div>
                                        </h6>
                                    </div>
                                    <div>
                                        <table class='center'>
                                            <tr>
                                                <td>
                                                    <TableContainer component={Paper}>
                                                        <Table size="large" style={{ minWidth: "1000" }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell className="table-css">Ticket Id</TableCell>
                                                                    <TableCell className="table-css">Ticket Name</TableCell>
                                                                    <TableCell className="table-css">Ticket Description</TableCell>
                                                                    <TableCell className="table-css">Ticket Status</TableCell>
                                                                    <TableCell className="table-css">Ticket Owner</TableCell>
                                                                    <TableCell className="table-css">Delete Ticket</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {tickets != null && tickets.map((row, keyIndex) => (
                                                                    <TableRow key={keyIndex}>
                                                                        <TableCell>{row.id}</TableCell>
                                                                        <TableCell>{row.title}</TableCell>
                                                                        <TableCell>{row.body}</TableCell>
                                                                        <TableCell>{row.ticketstatus}</TableCell>
                                                                        <TableCell>{row.username}</TableCell>
                                                                        <TableCell role="button"
                                                                            onClick={(rowData, rowMeta) => { deleteTicket(row) }}
                                                                        >DELETE</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>

    )
}

export default Ticket;