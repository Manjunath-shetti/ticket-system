import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function AddDepartment() {
    const [deptData, setDeptData] = useState(() => {
        return {
            departmentName: ''
        };
    });

    const handleChangeValue = (e) => {
        setDeptData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSaveDepartment = () => {
        console.log('Hello')
    }

    return (
        <>
            <Modal show={true} onHide={false} className="modal-no-border" dialogClassName="modal-50w" backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h6" className="align-items-center text-bold">Add New Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row margin-top-md">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-left">
                            <span className="text-bold">Department Name:</span>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-6 col-12 col-right">
                            <select className="form-control form-control-sm" name="name" value={''}
                                onChange={(e) => handleChangeValue(e)}></select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-warning text-white" onClick={false}>Close</div>
                    <div className="btn btn-warning text-white" onClick={() => handleSaveDepartment()}>Add Department</div>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default AddDepartment;