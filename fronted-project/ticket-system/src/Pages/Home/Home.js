import React, { useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux"
import DepartmentFunction from '../../Functions/Department/Department'
import { FaCog, FaInfoCircle } from 'react-icons/fa'
import './../../CSS/Home/Home.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Helmet } from "react-helmet";
import AddDepartment from './../../Component/AddDepartment'
function Home() {
    const userData = useSelector(state => state.user);
    const navigate = useNavigate();

    const [departments, setDepartments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteResponse, setDeleteResponse] = useState(null)

    const handleDepartmentProjects = (data) => {
        navigate('/projects', { state: data });
    }

    const deleteDepartment = (data) => {
        DepartmentFunction.deleteDepartment(data.id).then((response) => {
            if (response.data && response.data.data && response.data.data.status) {
                setDeleteResponse(response.data.data.data)
            }
        }).catch((e) => {
            console.error(e.toString())
        })
    }

    const handleOnAdd = () => {
        navigate('/adddepartment');
    }

    const logout = () => {
        navigate('/login');
    }

    useEffect(() => {
        if (userData.status) {
            DepartmentFunction.getAllDepartment().then((response) => {
                if (response.data && response.data.data && response.data.data.status) {
                    setDepartments(response.data.data.data)
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
                <title>Ticket System - Home</title>
            </Helmet>
            <div className="box">
                <div className="button-css">
                    <button type="button" className="button_example"
                        onClick={() => logout()}>Logout</button>
                </div>
                <h1>Ticket System - Home Page</h1>
                <div className="button-css">
                    <button type="button" class="btn btn-success"
                        onClick={() => handleOnAdd()}>Add New Department</button>
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
                                            <div>Department details
                                                <Tippy
                                                    theme="light"
                                                    placement="right"
                                                    content={<span>This is department data</span>}
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
                                                <tr>
                                                    <td>
                                                        <TableContainer className="table-center" component={Paper}>
                                                            <Table class="center">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell >Department Id</TableCell>
                                                                        <TableCell >Department Name</TableCell>
                                                                        <TableCell >Delete Department</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {departments != null && departments.map((row, keyIndex) => (
                                                                        <TableRow key={keyIndex}>
                                                                            <TableCell>{row.id}</TableCell>
                                                                            <TableCell role="button"
                                                                                onClick={(rowData, rowMeta) => { handleDepartmentProjects(row) }}
                                                                            >{row.name}</TableCell>
                                                                            <TableCell role="button"
                                                                                onClick={(rowData, rowMeta) => { deleteDepartment(row) }}
                                                                            >DELETE</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </td>
                                                </tr>
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

export default Home;