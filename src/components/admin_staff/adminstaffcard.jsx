import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './adminstaffcard.css';

const AdminStaff = () => {
    return ( 
        <>
            <Card style={{width: '300px', height: '300px'}}>
                <CardContent>
                    <Typography>Admin Login</Typography>
                </CardContent>
            </Card>
        </>
     );
}
 
export default AdminStaff;