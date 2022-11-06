import React, { useEffect, useState } from "react";
import { useHistory, useNavigate, useLocation } from "react-router-dom"
import { Button } from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux"
import ProjectFunction from '../../Functions/Project/Project'
import { FaCog, FaInfoCircle } from 'react-icons/fa'
import './../../CSS/Home/Home.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Helmet } from "react-helmet";
function Project() {
    const { state } = useLocation();
    const departmentData = state
    const userData = useSelector(state => state.user);
    const navigate = useNavigate();

    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteResponse, setDeleteResponse] = useState(null)

    const handleTickets = (data) => {
        navigate('/ticket', { state: data });
    }

    const handleOnAdd = () => {
        navigate('/addproject', { state: { id: departmentData.id } });
    }

    const logout = () => {
        navigate('/login');
    }

    const deleteProject = (data) => {
        ProjectFunction.deleteProject(data.id).then((response) => {
            if (response.data && response.data.data && response.data.data.status) {
                setDeleteResponse(response.data.data.data)
            }
        }).catch((e) => {
            console.error(e.toString())
        })
    }

    useEffect(() => {
        if (userData.status) {
            ProjectFunction.getProject(departmentData.id).then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    setProjects(response.data.data.data)
                }
            }).catch((e) => {
                console.error(e.toString())
            }).finally(() => {
                setLoading(false);
            });
        } else {
            navigate('/login');
        }
    }, [deleteResponse]);

    return (
        <>
            <Helmet>
                <title>Ticket System - Project</title>
            </Helmet>
            <div className="box">
                <div className="button-css">
                    <button type="button" className="button_example"
                        onClick={() => logout()}>Logout</button>
                </div>
                <h1>Ticket System - Project Page</h1>
                <div className="button-css">
                    <button type="button" class="btn btn-success"
                        onClick={() => handleOnAdd()}>Add New Project</button>
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
                                            <div>Project details
                                                <Tippy
                                                    theme="light"
                                                    placement="right"
                                                    content={<span>This is Project data</span>}
                                                >
                                                    <span>
                                                        <FaInfoCircle size="1em" className="overview-info-icon" />
                                                    </span>
                                                </Tippy>
                                            </div>
                                        </h6>
                                    </div>
                                    <div>
                                        <table class="center">
                                            <tr>
                                                <td>
                                                    <TableContainer component={Paper}>
                                                        <Table size="large" style={{ minWidth: "1000" }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell className="table-css">Project Id</TableCell>
                                                                    <TableCell className="table-css">Project Name</TableCell>
                                                                    <TableCell className="table-css">Delete Project</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {projects != null && projects.map((row, keyIndex) => (
                                                                    <TableRow key={keyIndex}>
                                                                        <TableCell>{row.id}</TableCell>
                                                                        <TableCell role="button"
                                                                            onClick={(rowData, rowMeta) => { handleTickets(row) }}
                                                                        >{row.name}</TableCell>
                                                                        <TableCell role="button"
                                                                            onClick={(rowData, rowMeta) => { deleteProject(row) }}
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

export default Project;