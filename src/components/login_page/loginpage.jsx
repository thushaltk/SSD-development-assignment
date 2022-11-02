import React from 'react';
import { Row } from 'reactstrap';
import AdminStaffCard from '../admin_staff/adminstaffcard';
import ManagerStaffCard from '../manager_staff/managerstaffcard';
import WorkerStaffCard from '../worker_staff/workerstaffcard';
import './loginpage.css';

const LoginPage = () => {
    return ( 
    <Row style={{display: 'flex', justifyContent: "space-evenly", width: "100%"}}>
        <AdminStaffCard/>
        <ManagerStaffCard/>
        <WorkerStaffCard/>
    </Row> 
    );
}
 
export default LoginPage;