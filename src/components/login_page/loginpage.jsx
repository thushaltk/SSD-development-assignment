import React from 'react';
import { Row } from 'reactstrap';
import Logincard from './logincard';
import './loginpage.css';

const LoginPage = () => {
    return ( 
    <Row style={{display: 'flex', justifyContent: "space-evenly", width: "100%", height: "100%", flexWrap: "wrap"}}>
        <Logincard/>
    </Row> 
    );
}
 
export default LoginPage;